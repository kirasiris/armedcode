"use client";
import Single from "./single";
import NumericPagination from "@/layout/numericpagination";
import NothingFoundAlert from "@/layout/nothingfoundalert";
import Globalcontent from "@/layout/content";

const List = ({ objects = [], searchParams = {} }) => {
	return (
		<div className="bg-black py-5 text-bg-dark">
			<div className="container">
				<div className="row">
					<Globalcontent classList="col-lg-12">
						{objects?.data?.length > 0 ? (
							<>
								<div className="row">
									{objects.data?.map((property) => (
										<Single key={property._id} object={property} />
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
							<NothingFoundAlert />
						)}
					</Globalcontent>
				</div>
			</div>
		</div>
	);
};

export default List;
