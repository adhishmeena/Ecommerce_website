import express from "express";
import { authUser } from "../Controlers/UserController.js";
const router = express.Router();

router.post("/login", authUser);

export default router;

// now we need to bring this route to server.js
