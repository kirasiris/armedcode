"use client";
import Single from "./single";
import NumericPagination from "@/layout/numericpagination";
import NothingFoundAlert from "@/layout/nothingfoundalert";
import Globalcontent from "@/layout/content";
import Sidebar from "@/layout/job/sidebar";

const List = ({ objects = [], searchedKeyword = "", searchParams = {} }) => {
	return (
		<div className="bg-black py-5 text-bg-dark">
			<div className="container">
				<div className="row">
					<Globalcontent>
						{objects?.data?.length > 0 ? (
							<>
								{objects.data?.map((job) => (
									<Single key={job._id} object={job} />
								))}
								<NumericPagination
									totalPages={
										objects?.pagination?.totalpages ||
										Math.ceil(objects?.data?.length / searchParams.limit)
									}
									searchParams={searchParams}
									siblings={1}
								/>
							</>
						) : (
							<NothingFoundAlert
								text={`Nothing found with ${searchedKeyword}`}
							/>
						)}
					</Globalcontent>
					<Sidebar />
				</div>
			</div>
		</div>
	);
};

export default List;
