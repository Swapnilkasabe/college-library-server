import mongoose from "mongoose";

const roles = ["normal", "admin"];

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
  },
  password: { type: String, required: true, minlength: 8 },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: roles },
});

export const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
