import express from "express";
import cors from "cors";
import users from "./routes/user.routes.js";
import knex from "knex";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Routes
app.use(users);

// DB Connection
const db = knex({
	client: "pg",
	connection: {
		host: process.env.DB_CONNECTION_URL,
		user: process.env.DB_CONNECTION_USER,
		password: process.env.PASSWORD,
		database: "smart-brain",
	},
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`App is running on port ${PORT}`);
});

export default db;
