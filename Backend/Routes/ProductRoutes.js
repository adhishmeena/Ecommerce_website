import express from "express";
import AysnHandler from "express-async-handler"; // we are using it just to avoid try catch in our code

const router = express.Router();

import Product from "../Models/ProductModel.js";

// @description Fetch all products
//@Route        Get /api/products
//@access       public
router.get(
  "/",
  AysnHandler(async (req, res) => {
    const products = await Product.find({}); // mongoose method return promise
    //   res.status(401);
    //   throw new Error("Not Authorized");

    res.json(products);
  })
);

//@description Fetch single product
//@Route        Get /api/products/:id
//@access       public

router.get(
  "/:id",
  AysnHandler(async (req, res) => {
    // route that shows products by id
    //   const product = products.find((p) => {
    //     return p._id === req.params.id;
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      //   res.status(404).json({ message: "Product Not found" });
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

export default router;
