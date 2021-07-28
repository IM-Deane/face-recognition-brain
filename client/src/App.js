import React, { useState } from "react";
import Particles from "react-particles-js";

import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import "./App.css";

const particlesOptions = {
	particles: {
		number: {
			value: 30,
			density: {
				enable: true,
				value_area: 800,
			},
		},
	},
};

const INITIAL_STATE = {
	input: "",
	imageUrl: "",
	box: {},
	route: "signin",
	isSignedIn: false,
	user: {
		id: "",
		name: "",
		email: "",
		entries: 0,
		joined: "",
	},
};

const App = ({ onRouteChange }) => {
	const [userData, setUserData] = useState(INITIAL_STATE.user);
	const [imageUrl, setImageUrl] = useState(INITIAL_STATE.imageUrl);
	const [box, setBox] = useState(INITIAL_STATE.box);
	const [route, setRoute] = useState(INITIAL_STATE.route);
	const [input, setInput] = useState(INITIAL_STATE.input);
	const [isSignedIn, setIsSignedIn] = useState(INITIAL_STATE.isSignedIn);

	// Add user to state upon successful sign/register
	const loadUser = ({ id, name, email, entries, joined }) => {
		setUserData({
			id: id,
			name: name,
			email: email,
			entries: entries,
			joined: joined,
		});
	};

	const calculateFaceLocation = (data) => {
		const clarifaiFace =
			data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById("inputimage");
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - clarifaiFace.right_col * width,
			bottomRow: height - clarifaiFace.bottom_row * height,
		};
	};

	const displayFaceBox = (box) => {
		setBox(box);
	};

	const onInputChange = (e) => {
		setInput(e.target.value);
	};

	const onButtonSubmit = () => {
		setImageUrl(input);
		fetch("https://smart-brain-server-im-deane.herokuapp.com/imageurl", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				input: input,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response) {
					fetch("https://smart-brain-server-im-deane.herokuapp.com/image", {
						method: "put",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							id: userData.id,
						}),
					})
						.then((response) => response.json())
						.then((count) => {
							setUserData({ ...userData, entries: count });
						})
						.catch((err) => console.log(err));
				}
				displayFaceBox(calculateFaceLocation(response));
			})
			.catch((err) => console.log(err));
	};

	onRouteChange = (route) => {
		if (route === "signout") {
			// Reset application on signout
			setUserData(INITIAL_STATE.user);
			setInput(INITIAL_STATE.input);
			setImageUrl(INITIAL_STATE.imageUrl);
			setRoute(INITIAL_STATE.route);
			setBox(INITIAL_STATE.box);
			setIsSignedIn(INITIAL_STATE.isSignedIn);
		} else if (route === "home") {
			setIsSignedIn(true);
		}
		setRoute(route);
	};

	return (
		<div className="App">
			<Particles className="particles" params={particlesOptions} />
			<Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
			{route === "home" ? (
				<div>
					<Logo />
					<Rank name={userData.name} entries={userData.entries} />
					<ImageLinkForm
						onInputChange={onInputChange}
						onButtonSubmit={onButtonSubmit}
					/>
					<FaceRecognition box={box} imageUrl={imageUrl} />
				</div>
			) : route === "signin" ? (
				<Signin loadUser={loadUser} onRouteChange={onRouteChange} />
			) : (
				<Register loadUser={loadUser} onRouteChange={onRouteChange} />
			)}
		</div>
	);
};

export default App;
