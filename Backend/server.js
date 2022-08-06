// Entry Point in server

import express from "express";
//import products from "./data/products.js";
import dotenv from "dotenv";
import connectDB from "./Config/DB.js";

import { notfound, errorHandler } from "./Middleware/ErrorMiddleware.js";
import ProductRoutes from "./Routes/ProductRoutes.js";
dotenv.config();

connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  // this is the middleware , It is used between request response cycle . whenever we make call to api/products or api/products/id or any other routes then this middleware will be called
  // console.log("hello");
  // console.log(req.originalUrl);
  next();
});

app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
); // created script in package.json to run server(npm start(script in package .json) or node backend/server in root folder)

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", ProductRoutes);

app.use(notfound);

app.use(errorHandler); //As this error middleware should replace the html error msg of above route so It should be placed below it.

// app.get("/api/products", (req, res) => {
//   res.json(products);
// });

// app.get("/api/products/:id", (req, res) => {
//   // route that shows products by id
//   const product = products.find((p) => {
//     return p._id === req.params.id;
//   });
//   res.json(product);
// });
