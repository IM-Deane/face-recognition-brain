import express from "express";
import * as UsersControllers from "../controllers/user.controllers.js";

const router = express.Router();

router.get("/", UsersControllers.getUsers);
router.get("/profile/:id", UsersControllers.getUserProfile);
router.post("/signin", UsersControllers.signInUser);
router.post("/register", UsersControllers.registerUser);
router.put("/image", UsersControllers.updateUserEntries);

export default router;
