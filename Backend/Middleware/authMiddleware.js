import jwt from "jsonwebtoken";
import AsyncHandler from "express-async-handler";
import User from "../Models/userModel.js";

const protect = AsyncHandler(async (req, res, next) => {
  let token;

  //console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
    } catch (error) {}

    console.log("token found");
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized , no token");
  }
  next();
});

export { protect };
