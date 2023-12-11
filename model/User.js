import mongoose from "mongoose";
import bcrypt from "bcrypt";

// defining Schema
const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  googleId: { type: String }
});

// Hashing the password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Model
const UserModel = mongoose.model("user", userSchema);

export default UserModel;
