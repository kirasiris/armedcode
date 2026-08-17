"use client";
import { useState } from "react";
import Single from "./dbsingle";
import ErrorPage from "@/layout/errorpage";

const List = ({
	objectId = 0,
	objects = [],
	handleRemoveItemFromCart = () => {},
}) => {
	const [newobjects, setNewObjects] = useState(objects);
	const [, setTotalResults] = useState({
		...objects,
		countAll: objects.length,
	});

	if (
		typeof handleRemoveItemFromCart !== "function" &&
		handleRemoveItemFromCart !== "" &&
		handleRemoveItemFromCart !== undefined &&
		handleRemoveItemFromCart !== null
	) {
		return (
			<ErrorPage
				statusCodeMessage={
					"The handleRemoveItemFromCart parameter is not a function!. Please try again"
				}
			/>
		);
	}

	return (
		<ul className="list-group">
			{objects.map((item) => (
				<Single
					key={item._id}
					cartId={objectId}
					object={item}
					handleRemoveItemFromCart={handleRemoveItemFromCart}
					objects={newobjects.data}
					setObjects={setNewObjects}
					setTotalResults={setTotalResults}
				/>
			))}
		</ul>
	);
};

export default List;
