import React, { useState } from "react";

const Register = ({ loadUser, onRouteChange }) => {
	const [userData, setUserData] = useState({
		email: "",
		password: "",
		name: "",
	});

	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	const onSubmitRegister = (e) => {
		e.preventDefault();

		fetch("https://smart-brain-server-im-deane.herokuapp.com/register", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: userData.email,
				password: userData.password,
				name: userData.name,
			}),
		})
			.then((res) => res.json())
			.then((user) => {
				// User account created, redirect to home page
				if (user.id) {
					loadUser(user);
					onRouteChange("home");
				}
			});
	};
	return (
		<article className="br3 ba b--white-50 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
			<main className="pa4 white-80">
				<div className="measure">
					<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
						<legend className="f1 fw6 ph0 mh0">Register</legend>
						<div className="mt3">
							<label className="db fw6 lh-copy f6" htmlFor="name">
								Name
							</label>
							<input
								className="pa2 input-reset white ba bg-transparent hover-bg-white hover-black w-100"
								type="text"
								name="name"
								id="name"
								onChange={handleFormChange}
							/>
						</div>
						<div className="mt3">
							<label className="db fw6 lh-copy f6" htmlFor="email-address">
								Email
							</label>
							<input
								className="pa2 input-reset white ba bg-transparent hover-bg-white hover-black w-100"
								type="email"
								name="email"
								id="email"
								onChange={handleFormChange}
							/>
						</div>
						<div className="mv3">
							<label className="db fw6 lh-copy f6" htmlFor="password">
								Password
							</label>
							<input
								className="b pa2 input-reset white ba bg-transparent hover-bg-white hover-black w-100"
								type="password"
								name="password"
								id="password"
								onChange={handleFormChange}
							/>
						</div>
					</fieldset>
					<div className="">
						<input
							onClick={onSubmitRegister}
							className="b ph3 pv2 input-reset white ba b--white bg-transparent grow pointer f6 dib"
							type="submit"
							value="Register"
						/>
					</div>
				</div>
			</main>
		</article>
	);
};

export default Register;
