import { Schema, model, models } from "mongoose";

// Define the schema
const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
    match: [/\S+@\S+\.\S+/, "Email is invalid!"]
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"],
  },
  image: {
    type: String,
    default: 'default-image-url',
  }
}, { timestamps: true });

UserSchema.index({ email: 1 });

const User = models.User || model("User", UserSchema);

export default User;
