import express from "express";
import {
  authUser,
  getUserProfile,
  RegisterUser,
  updateUserProfile,
} from "../Controlers/UserController.js";
import { protect } from "../Middleware/authMiddleware.js";
const router = express.Router();
router.post("/", RegisterUser);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
export default router;

// now we need to bring this route to server.js
