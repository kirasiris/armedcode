/**
 *
 * LOGIN PAGE IS THE ONLY THAT SHOULD NOT BE BLOCKED BY MAINTENANCE
 * ADMIN SHOULD BE ABLE TO ACCESS TO IT TO DISABLE IT ONCE MAINTENANCE HAS BEEN DONE OR WHILE ITS TAKING PLACE
 *
 *
 */
// import Link from "next/link";
import { redirect } from "next/navigation";
import Globalcontent from "@/layout/content";
import LoginForm from "@/forms/auth/loginform";
import Head from "@/app/head";
import { getGlobalData } from "@/helpers/globalData";

const Login = async ({ params, searchParams }) => {
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
				title={`${settings?.data?.title} - Login`}
				description={"Access your account"}
				favicon={settings?.data?.favicon}
				postImage={settings?.data?.showcase_image}
				imageWidth=""
				imageHeight=""
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				category=""
				url={`/auth/login`}
				author=""
				createdAt=""
				updatedAt=""
				locales=""
				posType="page"
			/>
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
								<div className="card-header text-center">Login</div>
								<div className="card-body">
									<LoginForm />
								</div>
							</div>
						</Globalcontent>
					</div>
				</div>
			</section>
		</>
	);
};

export default Login;
