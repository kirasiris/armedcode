"use client";

const Header = ({
	title = "",
	description = "",
	headerClasses = "",
	headerContainerClasses = "",
	headerStyle = {},
}) => {
	return (
		<header
			className={`bg-dark text-bg-dark py-5 ${headerClasses}`}
			style={headerStyle}
		>
			<div className={`container py-5 ${headerContainerClasses}`}>
				{title && (
					<h1 className="display-1 text-center text-uppercase">{title}</h1>
				)}
				{description && <p className="display-6 text-center">{description}</p>}
			</div>
		</header>
	);
};

export default Header;
