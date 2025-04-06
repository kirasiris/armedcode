import Single from "./single";
import NothingFoundAlert from "@/layout/nothingfoundalert";

const List = ({ objects = [], searchParams = {} }) => {
	return objects?.data?.length > 0 ? (
		objects.data?.map((weapon) => <Single key={weapon._id} object={weapon} />)
	) : (
		<NothingFoundAlert />
	);
};

export default List;
