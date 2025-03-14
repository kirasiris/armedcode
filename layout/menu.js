"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

const Menu = ({
	auth = {},
	title = "",
	logo = "https://www.fullstackpython.com/img/logos/bootstrap.png",
	canonical = "/",
	menus = [],
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
					<Link href={canonical} passHref legacyBehavior>
						<a
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
						</a>
					</Link>
				</div>
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav as="ul" className="me-auto">
						<li className="nav-item">
							<Link href={canonical} passHref legacyBehavior>
								<a
									className={`nav-link ${isActive(canonical)}`}
									aria-current="page"
								>
									Home
								</a>
							</Link>
						</li>
						{/* <li className="nav-item">
							<Link
								href={{
									pathname: `${canonical}/api`,
									query: {},
								}}
								passHref
								legacyBehavior
							>
								<a
									className={`nav-link ${isActive(`${canonical}/api`)}`}
									aria-current="page"
								>
									API
								</a>
							</Link>
						</li> */}
					</Nav>
					<Nav as="ul">
						<li className="nav-item">
							<Link
								href={{
									pathname: `${canonical}/about`,
									query: {},
								}}
								passHref
								legacyBehavior
							>
								<a
									className={`nav-link ${isActive(`${canonical}/about`)}`}
									aria-current="page"
								>
									About
								</a>
							</Link>
						</li>
						<li className="nav-item">
							<Link
								href={{
									pathname: `${canonical}/theme`,
									query: {},
								}}
								passHref
								legacyBehavior
							>
								<a
									className={`nav-link ${isActive(`${canonical}/theme`)}`}
									aria-current="page"
								>
									Portfolio
								</a>
							</Link>
						</li>
						<li className="nav-item">
							<Link
								href={{
									pathname: `${canonical}/review`,
									query: {},
								}}
								passHref
								legacyBehavior
							>
								<a
									className={`nav-link ${isActive(`${canonical}/review`)}`}
									aria-current="page"
								>
									Reviews
								</a>
							</Link>
						</li>
						<li className="nav-item">
							<Link
								href={{
									pathname: `${canonical}/contact`,
									query: {},
								}}
								passHref
								legacyBehavior
							>
								<a
									className={`nav-link ${isActive(`${canonical}/contact`)}`}
									aria-current="page"
								>
									Contact
								</a>
							</Link>
						</li>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Menu;
