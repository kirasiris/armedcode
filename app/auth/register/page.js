// import Link from "next/link";
import { redirect } from "next/navigation";
import Globalcontent from "@/layout/content";
import RegisterForm from "@/forms/auth/registerform";
import Head from "@/app/head";
import { getGlobalData } from "@/helpers/globalData";
import ErrorPage from "@/layout/errorpage";

const Register = async ({ params, searchParams }) => {
	const { auth, settings } = await getGlobalData();

	// Redirect if user is logged in
	auth?.data?.isOnline && redirect(`/`);

	return (
		<>
			<style>
				{`
					footer: {
						margin-top: 0px !important;
					}
				`}
			</style>
			<Head
				title={`${settings?.data?.title} - Register`}
				description={"Create an account"}
				favicon={settings?.data?.favicon}
				postImage={settings?.data?.showcase_image}
				imageWidth=""
				imageHeight=""
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				category=""
				url={`/auth/register`}
				author=""
				createdAt=""
				updatedAt=""
				locales=""
				posType="page"
			/>
			{settings?.data?.maintenance === false ? (
				<section className="bg-black text-bg-dark">
					<div
						className="container align-content-center"
						style={{
							height: "100vh",
						}}
					>
						<div className="row">
							<Globalcontent classList="col-lg-12">
								<div className="card border border-1 my-border-color bg-black text-bg-dark">
									<div className="card-header text-center">Register</div>
									<div className="card-body">
										<RegisterForm />
									</div>
								</div>
							</Globalcontent>
						</div>
					</div>
				</section>
			) : (
				<ErrorPage />
			)}
		</>
	);
};

export default Register;
