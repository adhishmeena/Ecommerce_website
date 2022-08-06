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

export { authUser };
