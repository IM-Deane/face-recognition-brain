import express from "express";
import cors from "cors";
import users from "./routes/users.js";

const app = express();
const PORT = 3000;

// Middlewares

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Routes
app.use(users);

app.listen(PORT, () => {
	console.log(`App is running on port ${PORT}`);
});
