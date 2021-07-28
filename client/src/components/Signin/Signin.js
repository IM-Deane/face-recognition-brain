import React, { useState } from "react";

const Signin = ({ loadUser, onRouteChange }) => {
	const [userData, setUserData] = useState({
		email: "",
		password: "",
	});

	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	const onSubmitSignIn = (e) => {
		e.preventDefault();

		fetch("https://smart-brain-server-im-deane.herokuapp.com/signin", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: userData.email,
				password: userData.password,
			}),
		})
			.then((res) => res.json())
			.then((user) => {
				if (user.id) {
					loadUser(user);
					// Redirect to home page
					onRouteChange("home");
				}
			});
	};

	return (
		<article className="br3 ba b--white-50 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
			<main className="pa4 white-80">
				<div className="measure">
					<fieldset id="sign_up" className="ba b--white ph3 mh0">
						<legend className="f1 fw6 ph0 mh0">Sign In</legend>
						<div className="mt3">
							<label className="db fw6 lh-copy f6" htmlFor="email-address">
								Email
							</label>
							<input
								className="pa2 input-reset white ba bg-transparent hover-bg-black hover-white w-100"
								type="email"
								name="email"
								id="email"
								autoComplete="off"
								onChange={handleFormChange}
							/>
						</div>
						<div className="mv3">
							<label className="db fw6 lh-copy f6" htmlFor="password">
								Password
							</label>
							<input
								className="b pa2 input-reset white ba bg-transparent hover-bg-black hover-white w-100"
								type="password"
								name="password"
								id="password"
								autoComplete="off"
								onChange={handleFormChange}
							/>
						</div>
					</fieldset>
					{/* Submit button */}
					<div className="mv3">
						<input
							onClick={onSubmitSignIn}
							className="b ph3 pv2 input-reset ba white b--white bg-transparent grow pointer f6 dib"
							type="submit"
							value="Sign in"
						/>
					</div>
					<div className="lh-copy mt3">
						<p
							onClick={() => onRouteChange("register")}
							className="f6 link dim white db pointer"
						>
							Don't have an account? Register here.
						</p>
					</div>
				</div>
			</main>
		</article>
	);
};

export default Signin;
