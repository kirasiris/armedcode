"use client";
import Image from "next/image";
import Globalsidebar from "../sidebar";

const Sidebar = ({ object = {} }) => {
	return (
		<Globalsidebar classList={`col-lg-4`}>
			<figure className="mb-4">
				<Image
					className="img-thumbnail"
					src={
						object?.data?.files?.avatar?.location?.secure_location ||
						`https://picsum.photos/1200/900?blur`
					}
					alt={`${object?.data?.avatar?.location?.fileName}'s featured image`}
					width={1200}
					height={900}
					priority
				/>
			</figure>
			{object?.data?.preview_theme_url !== "#" && (
				<a
					href={object?.data?.preview_theme_url}
					className="btn btn-secondary btn-sm mb-3 w-100"
					target="_blank"
					rel="noreferrer noopener"
				>
					Preview Theme
				</a>
			)}
		</Globalsidebar>
	);
};

export default Sidebar;
