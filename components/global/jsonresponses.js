"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import ParseHtml from "@/layout/parseHtml";

const JsonResponses = ({ text = "" }) => {
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

	const presentationUrl = text || "";

	return (
		<>
			<ParseHtml
				text={text}
				classList="bg-black text-bg-dark w-100 m-0"
				parseAs="pre"
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

export default JsonResponses;
