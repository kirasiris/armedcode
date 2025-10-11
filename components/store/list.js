"use client";
import Single from "./single";
import NumericPagination from "@/layout/numericpagination";
import NothingFoundAlert from "@/layout/nothingfoundalert";
import Globalcontent from "@/layout/content";
import Sidebar from "@/layout/store/sidebar";

const List = ({ objects = [], searchedKeyword = "", searchParams = {} }) => {
	return (
		<div className="bg-black py-5 text-bg-dark">
			<div className="container">
				<div className="row">
					<Globalcontent classList="col-lg-12">
						{objects?.data?.length > 0 ? (
							<>
								<div className="row">
									{objects.data?.map((blog) => (
										<Single key={blog._id} object={blog} />
									))}
								</div>
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
					{/* <Sidebar /> */}
				</div>
			</div>
		</div>
	);
};

export default List;
