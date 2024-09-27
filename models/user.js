import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: false,
  },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
