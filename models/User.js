import mongoose from "mongoose";

const roles = ["normal", "admin"];

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true, minlength: 8 },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: roles },
});

UserSchema.index({ email: 1 });

export const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
