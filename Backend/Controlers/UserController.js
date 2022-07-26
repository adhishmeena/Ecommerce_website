// objective of this file is to handle all controller for the application
import AsyncHandler from "express-async-handler"; // we are using it just to avoid try catch in our code
import generateToken from "../Utils/GenerateTokens.js";
import User from "../Models/userModel.js";

// first route that we are going to create is to autheticate the user , as we want to validate the user's email and password and then we want to send back some data , now ultimatly we want to send back some token that we can  save on client and this will be used to access protected routes later
// @description Auth user a& get token
//@Route        POST /api/users/login
//@access       public
const authUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  /// res.send({ email, password }); checking with postman that we can access this data from request.body
  const user = await User.findOne({ email }); // this will find the password
  // now we need to make sure that password should also match
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @description Register a new User
//@Route        POST /api/users
//@access       public
const RegisterUser = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  /// res.send({ email, password }); checking with postman that we can access this data from request.body
  const userExists = await User.findOne({ email }); // this will find the password
  // now we need to make sure that password should also match
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });
  //Here it is plane text so we will use some moongoose middleware to encrypt it
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});

// @description Get User Profile
//@Route        GET /api/users/profile
//@access       private
const getUserProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // it will find the current logged in user
  //res.send("Success");

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not found");
  }
});

// @description Update User Profile
//@Route        PUT /api/users/profile
//@access       private (because they need to be logged-in)
const updateUserProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // it will find the current logged in user
  //res.send("Success");

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password; // this password will be encrypted automatically , beacause we have a middleware(in userModel.js) that will auto encrypt it.
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not found");
  }
});

export { authUser, getUserProfile, RegisterUser, updateUserProfile };
