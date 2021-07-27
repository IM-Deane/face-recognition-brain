import db from "../server.js";
import bcrypt from "bcryptjs";

export const getUsers = (req, res) => {
	res.json("Hello from server");
};

export const getUserProfile = (req, res) => {
	const { id } = req.params;

	// Get user by their id from db
	db.select("*")
		.from("users")
		.where({ id })
		.then((user) =>
			user.length ? res.json(user[0]) : res.status(404).json("User not found")
		)
		.catch((err) => res.status(400).json("Error getting user."));
};

export const signInUser = (req, res) => {
	const { email, password } = req.body;

	db.select("email", "hash")
		.from("login")
		.where("email", "=", email)
		.then((data) => {
			const isValid = bcrypt.compareSync(password, data[0].hash);
			if (isValid) {
				return db
					.select("*")
					.from("users")
					.where("email", "=", email)
					.then((user) => res.json(user[0]))
					.catch((err) => res.status(400).json("Unable to get user."));
			} else {
				res.status(400).json("Wrong credentials.");
			}
		})
		.catch((err) => res.status(400).json("Wrong credentials."));
};

export const registerUser = (req, res) => {
	const { email, name, password } = req.body;

	// Hash user password
	const hash = bcrypt.hashSync(password, 10);

	// Transaction will roll back insert operation if any error
	// is encountered.
	db.transaction((trx) => {
		trx
			.insert({
				hash,
				email,
			})
			.into("login")
			// Returning = provides result of last insert
			.returning("email")
			.then((loginEmail) => {
				return (
					trx("users")
						.returning("*")
						.insert({
							email: loginEmail[0],
							name,
							joined: new Date(),
						})
						.then((user) => {
							res.json(user[0]);
						})
						// Commit or rollback transaction
						.then(trx.commit)
						.catch(trx.rollback)
				);
			})
			.catch((err) => res.status(400).json("Unable to register."));
	});
};

export const updateUserEntries = (req, res) => {
	const { id } = req.body;

	db("users")
		.where("id", "=", id)
		.increment("entries", 1)
		.returning("entries")
		.then((entries) => res.json(entries[0]))
		.catch((err) => res.status(400).json("Unable to retrieve entries."));
};
