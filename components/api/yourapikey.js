"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const YourApiKey = ({ token = {} }) => {
	const [copiedUrl, setCopiedUrl] = useState(false);
	const timeoutRef = useRef(null);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const copyToClipboard = useCallback((text) => {
		navigator.clipboard.writeText(text);
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		setCopiedUrl(true);
		timeoutRef.current = setTimeout(() => setCopiedUrl(false), 2000);
	}, []);

	const presentationUrl = token?.value || "armed_code_sk_12345abcdef67890";

	return (
		<>
			<input
				value={presentationUrl}
				type="text"
				className="form-control text-bg-dark"
				readOnly
				disabled
			/>
			<button
				className={`btn ${copiedUrl ? "btn-success" : "btn-light"}`}
				onClick={() => copyToClipboard(presentationUrl)}
			>
				{copiedUrl ? (
					"Copied!"
				) : (
					<i aria-hidden className="fa-regular fa-clone" />
				)}
			</button>
		</>
	);
};

export default YourApiKey;
