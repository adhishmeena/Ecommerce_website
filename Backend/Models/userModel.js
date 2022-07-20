import mongoose from "mongoose";

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

const User = mongoose.model("User", userSchema);

export default User;
