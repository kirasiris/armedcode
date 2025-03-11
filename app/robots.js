const robots = () => {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/noadmin", "/dashboard", "playground"],
		},
		sitemap: "https://armedcodellc.com/blog/sitemap.xml",
	};
};

export default robots;
