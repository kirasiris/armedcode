"use client";
import Single from "./single";
import NothingFoundAlert from "@/layout/nothingfoundalert";

const List = ({ objects = [], params = {}, searchParams = {} }) => {
	return objects?.length > 0 ? (
		objects.map(
			(weapon) =>
				weapon !== undefined &&
				weapon !== null && <Single key={weapon._id} object={weapon} />
		)
	) : (
		<NothingFoundAlert />
	);
};

export default List;
