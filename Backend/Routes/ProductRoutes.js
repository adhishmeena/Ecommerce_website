import express from "express";
import {
  getProductbyId,
  getProducts,
} from "../Controlers/ProductController.js";
const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProductbyId);

export default router;
