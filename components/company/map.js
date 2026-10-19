"use client";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";

const RTL_TEXT_PLUGIN =
	"https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js";
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const SOURCE_ID = "companies";
const CLUSTER_LAYER = "clusters";
const CLUSTER_COUNT_LAYER = "cluster-count";
const POINT_LAYER = "unclustered-point";
const HIGHLIGHT_LAYER = "highlighted-point";
const CLUSTER_MAX_ZOOM = 14;

const PIN_COLOR = "#d63384";
const HIGHLIGHT_COLOR = "#0d6efd";

const MAP_STYLES = [
	{ value: "streets-v12", label: "Streets" },
	{ value: "satellite-streets-v12", label: "Satellite Streets" },
	{ value: "light-v11", label: "Light" },
	{ value: "dark-v11", label: "Dark" },
	{ value: "outdoors-v12", label: "Outdoors" },
];

const FALLBACK_STYLE = {
	version: 8,
	sources: {
		osm: {
			type: "raster",
			tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
			tileSize: 256,
			attribution: "&copy; OpenStreetMap contributors",
		},
	},
	layers: [{ id: "osm", type: "raster", source: "osm" }],
};

const resolveStyle = (styleKey) =>
	MAPBOX_TOKEN ? `mapbox://styles/mapbox/${styleKey}` : FALLBACK_STYLE;

const highlightFilter = (ids) => [
	"all",
	["!", ["has", "point_count"]],
	["in", ["get", "id"], ["literal", ids]],
];

const toBoundsArray = (map) => {
	const bounds = map.getBounds();
	return [
		bounds.getWest(),
		bounds.getSouth(),
		bounds.getEast(),
		bounds.getNorth(),
	];
};

// Built with textContent rather than setHTML: titles and addresses are user data.
const buildPopupContent = ({ title, address, href }) => {
	const root = document.createElement("div");
	root.className = "pe-3";

	const heading = document.createElement("a");
	heading.className = "d-block fw-semibold text-decoration-none mb-1";
	heading.href = href;
	heading.textContent = title || "Untitled";
	root.appendChild(heading);

	if (address) {
		const line = document.createElement("small");
		line.className = "text-body-secondary";
		line.textContent = address;
		root.appendChild(line);
	}

	return root;
};

const Map = ({
	featureCollection,
	fitKey = "",
	hoveredId,
	selection,
	onSelect,
	onHover,
	onBoundsChange,
	getHref,
	id = "companies-map",
}) => {
	const containerRef = useRef(null);
	const mapRef = useRef(null);
	const sdkRef = useRef(null);
	const popupRef = useRef(null);

	const [mapReady, setMapReady] = useState(false);
	const [unsupported, setUnsupported] = useState(false);
	const [mapStyle, setMapStyle] = useState(MAP_STYLES[0].value);
	const appliedStyleRef = useRef(mapStyle);

	// The map's event handlers are bound once, so they read the latest props via refs.
	const dataRef = useRef(featureCollection);
	const lastFitKeyRef = useRef(null);
	const highlightRef = useRef([]);
	const callbacksRef = useRef({ onSelect, onHover, onBoundsChange, getHref });
	callbacksRef.current = { onSelect, onHover, onBoundsChange, getHref };

	useEffect(() => {
		let cancelled = false;
		let resizeObserver;
		(async () => {
			const mapboxgl = (await import("mapbox-gl")).default;
			if (cancelled || !containerRef.current) return;

			sdkRef.current = mapboxgl;
			mapboxgl.accessToken = MAPBOX_TOKEN || "no-token";

			if (typeof mapboxgl.supported === "function" && !mapboxgl.supported()) {
				setUnsupported(true);
				return;
			}

			// mapbox-gl >= 3.x bundles RTL support and dropped these functions.
			if (
				typeof mapboxgl.getRTLTextPluginStatus === "function" &&
				mapboxgl.getRTLTextPluginStatus() === "unavailable"
			) {
				mapboxgl.setRTLTextPlugin(RTL_TEXT_PLUGIN, null, true);
			}

			const map = new mapboxgl.Map({
				container: containerRef.current,
				style: resolveStyle(appliedStyleRef.current),
				center: [-98.5795, 39.8283],
				zoom: 3,
				attributionControl: false,
			});
			mapRef.current = map;

			map.addControl(
				new mapboxgl.AttributionControl({
					customAttribution:
						"Map design by <a href='https://kevinurielfonseca.me/' target='_blank' rel='noreferrer'>Kevin Uriel Fonseca</a>",
				}),
			);
			map.addControl(new mapboxgl.FullscreenControl());
			map.addControl(new mapboxgl.NavigationControl());

			const addDataLayers = () => {
				if (map.getSource(SOURCE_ID)) return;

				map.addSource(SOURCE_ID, {
					type: "geojson",
					data: dataRef.current,
					cluster: true,
					clusterMaxZoom: CLUSTER_MAX_ZOOM,
					clusterRadius: 50,
				});

				map.addLayer({
					id: CLUSTER_LAYER,
					type: "circle",
					source: SOURCE_ID,
					filter: ["has", "point_count"],
					paint: {
						"circle-color": PIN_COLOR,
						"circle-opacity": 0.85,
						"circle-radius": [
							"step",
							["get", "point_count"],
							16,
							10,
							22,
							50,
							30,
						],
						"circle-stroke-width": 2,
						"circle-stroke-color": "#ffffff",
					},
				});

				// Symbol text needs glyphs, which only Mapbox-hosted styles provide.
				if (MAPBOX_TOKEN) {
					map.addLayer({
						id: CLUSTER_COUNT_LAYER,
						type: "symbol",
						source: SOURCE_ID,
						filter: ["has", "point_count"],
						layout: {
							"text-field": ["get", "point_count_abbreviated"],
							"text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
							"text-size": 12,
							"text-allow-overlap": true,
						},
						paint: { "text-color": "#ffffff" },
					});
				}

				map.addLayer({
					id: POINT_LAYER,
					type: "circle",
					source: SOURCE_ID,
					filter: ["!", ["has", "point_count"]],
					paint: {
						"circle-color": PIN_COLOR,
						"circle-radius": 8,
						"circle-stroke-width": 2,
						"circle-stroke-color": "#ffffff",
					},
				});

				map.addLayer({
					id: HIGHLIGHT_LAYER,
					type: "circle",
					source: SOURCE_ID,
					filter: highlightFilter(highlightRef.current),
					paint: {
						"circle-color": HIGHLIGHT_COLOR,
						"circle-radius": 12,
						"circle-stroke-width": 3,
						"circle-stroke-color": "#ffffff",
					},
				});
			};

			// style.load fires on first load AND after every setStyle (which wipes custom layers).
			map.on("style.load", () => {
				addDataLayers();
				setMapReady(true);
			});

			map.on("load", () => map.resize());

			map.on("moveend", () => {
				callbacksRef.current.onBoundsChange?.(toBoundsArray(map));
			});

			map.on("click", CLUSTER_LAYER, (event) => {
				const feature = event.features?.[0];
				if (!feature) return;
				map
					.getSource(SOURCE_ID)
					.getClusterExpansionZoom(
						feature.properties.cluster_id,
						(error, zoom) => {
							if (error) return;
							map.easeTo({ center: feature.geometry.coordinates, zoom });
						},
					);
			});

			// mousemove fires dozens of times a second; only report actual changes.
			let lastHoveredId = null;
			const reportHover = (companyId) => {
				if (companyId === lastHoveredId) return;
				lastHoveredId = companyId;
				callbacksRef.current.onHover?.(companyId);
			};

			for (const layer of [POINT_LAYER, HIGHLIGHT_LAYER]) {
				map.on("click", layer, (event) => {
					const companyId = event.features?.[0]?.properties?.id;
					if (companyId) callbacksRef.current.onSelect?.(companyId, "map");
				});
				map.on("mousemove", layer, (event) => {
					const companyId = event.features?.[0]?.properties?.id;
					if (companyId) reportHover(companyId);
				});
				map.on("mouseleave", layer, () => reportHover(null));
			}

			for (const layer of [CLUSTER_LAYER, POINT_LAYER, HIGHLIGHT_LAYER]) {
				map.on("mouseenter", layer, () => {
					map.getCanvas().style.cursor = "pointer";
				});
				map.on("mouseleave", layer, () => {
					map.getCanvas().style.cursor = "";
				});
			}

			// Covers the mobile Map/List toggle, where the container starts as display:none.
			resizeObserver = new ResizeObserver(() => map.resize());
			resizeObserver.observe(containerRef.current);
		})();

		return () => {
			cancelled = true;
			resizeObserver?.disconnect();
			popupRef.current?.remove();
			popupRef.current = null;
			mapRef.current?.remove();
			mapRef.current = null;
			setMapReady(false);
		};
	}, []);

	// Infinite scroll appends pins as pages load; only reframe the map once per
	// search (fitKey) so it doesn't jump every time the list grows.
	useEffect(() => {
		dataRef.current = featureCollection;

		const map = mapRef.current;
		const mapboxgl = sdkRef.current;
		if (!mapReady || !map || !mapboxgl) return;

		map.getSource(SOURCE_ID)?.setData(featureCollection);

		const { features } = featureCollection;
		if (!features.length || lastFitKeyRef.current === fitKey) return;
		lastFitKeyRef.current = fitKey;

		if (features.length === 1) {
			map.jumpTo({ center: features[0].geometry.coordinates, zoom: 13 });
		} else {
			const bounds = new mapboxgl.LngLatBounds();
			for (const feature of features)
				bounds.extend(feature.geometry.coordinates);
			map.fitBounds(bounds, { padding: 60, maxZoom: 14, duration: 0 });
		}
	}, [mapReady, featureCollection, fitKey]);

	const selectedId = selection?.id ?? null;

	useEffect(() => {
		highlightRef.current = [hoveredId, selectedId].filter(Boolean);
		const map = mapRef.current;
		if (!mapReady || !map?.getLayer(HIGHLIGHT_LAYER)) return;
		map.setFilter(HIGHLIGHT_LAYER, highlightFilter(highlightRef.current));
	}, [mapReady, hoveredId, selectedId]);

	useEffect(() => {
		const map = mapRef.current;
		const mapboxgl = sdkRef.current;
		if (!mapReady || !map || !mapboxgl || !selection) return;

		// Read pins from the ref: depending on featureCollection would rebuild the
		// popup and re-fly the map every time infinite scroll appends a page.
		const feature = dataRef.current.features.find(
			(item) => item.properties.id === selection.id,
		);
		if (!feature) return;

		const coordinates = feature.geometry.coordinates;
		const handleClose = () => callbacksRef.current.onSelect?.(null);

		// closeOnClick would fire after a pin's click handler and clear the new selection.
		const popup = new mapboxgl.Popup({
			offset: 14,
			maxWidth: "260px",
			closeOnClick: false,
		})
			.setLngLat(coordinates)
			.setDOMContent(
				buildPopupContent({
					...feature.properties,
					href: callbacksRef.current.getHref(feature.properties),
				}),
			)
			.addTo(map);
		popup.on("close", handleClose);
		popupRef.current = popup;

		// A list click must zoom past clusterMaxZoom so the pin is actually visible.
		if (selection.source === "list") {
			map.flyTo({
				center: coordinates,
				zoom: Math.max(map.getZoom(), CLUSTER_MAX_ZOOM + 1),
				essential: true,
			});
		}

		return () => {
			// Detach first: programmatic removal also fires "close", which would clear the next selection.
			popup.off("close", handleClose);
			popup.remove();
			if (popupRef.current === popup) popupRef.current = null;
		};
	}, [mapReady, selection]);

	useEffect(() => {
		const map = mapRef.current;
		if (!mapReady || !map || !MAPBOX_TOKEN) return;
		if (mapStyle === appliedStyleRef.current) return;

		appliedStyleRef.current = mapStyle;
		map.setStyle(resolveStyle(mapStyle), { diff: false });
	}, [mapReady, mapStyle]);

	const pointCount = featureCollection.features.length;
	let message = "";
	if (unsupported) message = "Mapbox is not supported on this browser";
	else if (mapReady && pointCount === 0) message = "No locations to display";

	return (
		<div className="position-relative h-100 w-100">
			<div
				id={id}
				ref={containerRef}
				className="w-100 h-100"
				role="region"
				aria-label={`Map showing ${pointCount} compan${
					pointCount === 1 ? "y" : "ies"
				}`}
			/>

			{MAPBOX_TOKEN && (
				<div className="position-absolute top-0 start-0 m-2 z-1">
					<label htmlFor={`${id}-style`} className="visually-hidden">
						Map style
					</label>
					<select
						id={`${id}-style`}
						className="form-select form-select-sm shadow-sm"
						value={mapStyle}
						onChange={(event) => setMapStyle(event.target.value)}
					>
						{MAP_STYLES.map((style) => (
							<option key={style.value} value={style.value}>
								{style.label}
							</option>
						))}
					</select>
				</div>
			)}

			{message && (
				<div className="position-absolute top-50 start-50 translate-middle z-1 bg-body px-3 py-2 rounded shadow-sm text-center">
					<b>{message}</b>
				</div>
			)}
		</div>
	);
};

export default Map;
