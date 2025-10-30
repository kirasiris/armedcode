"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { deleteAuthTokenOnServer } from "@/helpers/fetchurl";

const Menu = ({
	auth = {},
	title = "",
	logo = "https://www.fullstackpython.com/img/logos/bootstrap.png",
	canonical = "/",
}) => {
	const pathname = usePathname();
	const isActive = (path = "") => {
		return pathname === path ? "active" : "";
	};
	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Container>
				<div className="navbar-header">
					<Navbar.Toggle
						aria-controls="responsive-navbar-nav"
						className="me-1"
					/>
					<Link
						href={canonical}
						passHref
						className={`navbar-brand`}
						target="_blank"
						style={{ verticalAlign: "middle" }}
					>
						<Image
							alt={title}
							src={logo}
							width="150"
							height="40"
							className="d-inline-block align-text-top"
						/>
					</Link>
				</div>
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav as="ul" className="me-auto">
						<li className="nav-item">
							<Link
								href={{
									pathname: canonical,
									query: {},
								}}
								className={`nav-link ${isActive(canonical)}`}
							>
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link
								href={{
									pathname: `${canonical}/about`,
									query: {},
								}}
								className={`nav-link ${isActive(canonical)}/about`}
							>
								About
							</Link>
						</li>
						<li className="nav-item">
							<Link
								href={{
									pathname: `${canonical}/blog`,
									query: {},
								}}
								className={`nav-link ${isActive(`${canonical}/blog`)}`}
							>
								Blog
							</Link>
						</li>
						<li className="nav-item">
							<Link
								href={{
									pathname: `${canonical}/theme`,
									query: {},
								}}
								className={`nav-link ${isActive(`${canonical}/theme`)}`}
							>
								Portfolio
							</Link>
						</li>
						<li className="nav-item">
							<Link
								href={{
									pathname: `${canonical}/review`,
									query: {},
								}}
								className={`nav-link ${isActive(`${canonical}/review`)}`}
							>
								Reviews
							</Link>
						</li>
						<li className="nav-item">
							<Link
								href={{
									pathname: `${canonical}/contact`,
									query: {},
								}}
								className={`nav-link ${isActive(`${canonical}/contact`)}`}
							>
								Contact
							</Link>
						</li>
					</Nav>
					<Nav as="ul">
						{auth?.data?.isOnline ? (
							<>
								<li className="nav-item">
									<Link
										href={{
											pathname: `${canonical}/dashboard`,
											query: {},
										}}
										className={`nav-link ${isActive(`${canonical}/dashboard`)}`}
									>
										Dashboard
									</Link>
								</li>
								{/* <li className="nav-item">
									<Link
										href={{
											pathname: `${canonical}/api`,
											query: {},
										}}
										className={`nav-link ${isActive(`${canonical}/api`)}`}
									>
										API
									</Link>
								</li> */}
								<li className="nav-item">
									<Link
										href={{
											pathname: `${canonical}/cart`,
											query: {},
										}}
										className={`nav-link ${isActive(`${canonical}/cart`)}`}
									>
										Cart
									</Link>
								</li>
								<li className="nav-item">
									<button
										type="button"
										className="btn btn-link"
										onClick={async () => {
											await deleteAuthTokenOnServer();
										}}
									>
										Log Out
									</button>
								</li>
							</>
						) : (
							<>
								<li className="nav-item">
									<a
										href={`${process.env.NEXT_PUBLIC_FOUNDER_WEBSITE_URL}auth/login?returnpage=${process.env.NEXT_PUBLIC_WEBSITE_URL}`}
										className="nav-link"
										target="_blank"
										rel="noreferrer noopener"
									>
										Login
									</a>
								</li>
								<li className="nav-item">
									<a
										href={`${process.env.NEXT_PUBLIC_FOUNDER_WEBSITE_URL}auth/register`}
										className="nav-link"
										target="_blank"
										rel="noreferrer noopener"
									>
										Register
									</a>
								</li>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Menu;
