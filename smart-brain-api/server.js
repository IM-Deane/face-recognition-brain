import express from "express";

import users from "./routes/users.js";

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use(users);

app.listen(PORT, () => {
	console.log(`App is running on port ${PORT}`);
});
