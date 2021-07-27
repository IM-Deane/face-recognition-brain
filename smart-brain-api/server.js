import express from "express";

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const database = {
	users: [
		{
			id: "123",
			name: "John",
			email: "john@gmail.com",
			password: "monkey",
			entries: 0,
			joined: new Date(),
		},
		{
			id: "124",
			name: "Sally",
			email: "sally@gmail.com",
			password: "cookies",
			entries: 0,
			joined: new Date(),
		},
	],
};

app.get("/", (req, res) => {
	res.send("This is working!");
});

app.post("/signin", (req, res) => {
	const { email, password } = req.body;
	if (
		email === database.users[0].email &&
		password === database.users[0].password
	) {
		res.json("Successfully signed in");
	} else {
		res.status(400).json("Error logging in.");
	}
});

app.listen(PORT, () => {
	console.log(`App is running on port ${PORT}`);
});
