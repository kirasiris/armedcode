"use client";
import React from "react";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import Image from "next/image";

const Footer = ({
	auth = {},
	classList = "",
	styleList = {},
	canonical = process.env.NEXT_PUBLIC_WEBSITE_URL,
	menus = [],
}) => {
	return (
		<footer
			className={`py-5 bg-black text-bg-dark ${classList}`}
			style={styleList}
		>
			<hr />
			<div className="container">
				<div className="text-center text-secondary">
					<p>
						<button className="btn btn-light btn-sm" type="button">
							&lt;/&gt;
						</button>
						&nbsp;made&nbsp;with&nbsp;
						<button className="btn btn-light btn-sm" type="button">
							&#10084;
						</button>
						&nbsp;&#38;&nbsp;
						<button className="btn btn-light btn-sm" type="button">
							&#9749;
						</button>
					</p>
					<p>
						BY&nbsp;
						<a
							href={process.env.NEXT_PUBLIC_FOUNDER_WEBSITE_URL}
							className="btn btn-secondary btn-sm"
						>
							KEVIN&nbsp;URIEL
						</a>
					</p>
				</div>
			</div>
			<hr />
			<div className="container d-flex flex-column flex-sm-row justify-content-between py-4 my-4">
				<p className="text-secondary">
					© 2025 {process.env.NEXT_PUBLIC_WEBSITE_NAME}. All rights reserved.
				</p>
				<ul className="list-unstyled d-flex">
					<li className="me-3">
						<Link
							href={{
								pathname: `${canonical}/privacy-policy`,
								query: {},
							}}
							passHref
							legacyBehavior
						>
							<a className="text-secondary text-decoration-underline">
								Privacy Policy
							</a>
						</Link>
					</li>
					<li>
						<Link
							href={{
								pathname: `${canonical}/terms-of-service`,
								query: {},
							}}
							passHref
							legacyBehavior
						>
							<a className="text-secondary text-decoration-underline">
								Terms of Service
							</a>
						</Link>
					</li>
				</ul>
			</div>
			<ToastContainer />
		</footer>
	);
};

export default Footer;
