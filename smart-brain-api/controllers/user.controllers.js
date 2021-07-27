// Mock user database
import { users } from "../constants/user.data.js";
import bcrypt from "bcryptjs";

export const getUsers = (req, res) => {
	res.json(users);
};

export const getUserProfile = (req, res) => {
	const { id } = req.params;
	let isFound = false;

	users.forEach((user) => {
		if (user.id === id) {
			isFound = true;
			return res.json(user);
		}
	});
	if (!isFound) {
		res.status(404).json("User not found");
	}
};

export const signInUser = (req, res) => {
	const { email, password } = req.body;

	// Search for user in database

	// const user = users.findIndex((user) => user.email === email);

	// // Check hashed password
	// console.log(bcrypt.compareSync(user.password, password));

	if (email === users[0].email && password === users[0].password) {
		res.json({
			id: "123",
			name: "John",
			email: "john@gmail.com",
			entries: 0,
			joined: new Date(),
		});
	} else {
		res.status(400).json("Error logging in.");
	}
};

export const registerUser = (req, res) => {
	const { email, name, password } = req.body;

	// Hash user password
	// const hashedPassword = bcrypt.hashSync("bacon", 10);

	users.push({
		id: "125",
		name,
		email,
		entries: 0,
		joined: new Date(),
	});

	res.json(users[users.length - 1]);
};

export const updateUserEntries = (req, res) => {
	const { id } = req.body;
	let isFound = false;

	users.forEach((user) => {
		if (user.id === id) {
			isFound = true;
			user.entries++;
			return res.json(user.entries);
		}
	});

	if (!isFound) {
		res.status(404).json("User not found");
	}
};
