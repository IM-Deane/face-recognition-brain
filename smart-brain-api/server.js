import express from "express";
import cors from "cors";
import users from "./routes/user.routes.js";
import knex from "knex";

const app = express();
const PORT = 3000;

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
		host: "127.0.0.1",
		user: "tristandeane",
		password: "Masterlock",
		database: "smart-brain",
	},
});

app.listen(PORT, () => {
	console.log(`App is running on port ${PORT}`);
});

export default db;
