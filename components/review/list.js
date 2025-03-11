import Globalcontent from "@/layout/content";
import NothingFoundAlert from "@/layout/nothingfoundalert";
import Sidebar from "@/layout/review/sidebar";
import Single from "./single";

const List = ({ objects = [], searchParams = {}, returtopageurl = "/" }) => {
	return (
		<section className="bg-black py-5 text-bg-dark">
			<div className="container">
				<div className="row">
					<Globalcontent>
						{objects?.data?.length > 0 ? (
							<>
								{objects.data.map((review) => (
									<Single key={review._id} object={review} />
								))}
							</>
						) : (
							<NothingFoundAlert />
						)}
					</Globalcontent>
					<Sidebar objects={objects} returtopageurl={returtopageurl} />
				</div>
			</div>
		</section>
	);
};

export default List;
