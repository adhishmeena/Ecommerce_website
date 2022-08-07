import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema(
  {
    user: {
      // I also want to know the product name created by each user.
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false, // when user register by default , he is not an admin , An admin need to make him admin (manually)
    },
  },
  {
    timestamps: true,
  }
);

// this function is to check the password of user
userSchema.methods.matchPassword = async function (enteredPassword) {
  // compare the plane text to encrypted password
  return await bcrypt.compare(enteredPassword, this.password); // we call this method (matchPassword) on that specific user and then can access their password using this.password
};

//before I would like to encrypt the password before I save it to database

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
