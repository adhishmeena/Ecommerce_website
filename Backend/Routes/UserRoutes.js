import express from "express";
import { authUser, getUserProfile } from "../Controlers/UserController.js";
import { protect } from "../Middleware/authMiddleware.js";
const router = express.Router();

router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);
export default router;

// now we need to bring this route to server.js
