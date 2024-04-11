import UserModel from "../../models/User.js";
import {
  generateAuthToken,
  hashPassword,
  verifyPassword,
} from "../auth/auth.service.js";

export const signup = async (userData) => {
  const srcFn = "signup";
  try {
    const { password, ...otherData } = userData;
    const hashedPassword = await hashPassword(password);
    const newUser = new UserModel({ ...otherData, password: hashedPassword });
    await newUser.save();
    return res.status(201).json({ user: newUser._id });
  } catch (error) {
    throw new Error("Error signing up user");
  }
};

export const login = async (req, res) => {
  const srcFn = "login";
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).send({ error: "User not found" });
    }
    const isPasswordMatch = await verifyPassword(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const token = generateAuthToken(user);
    return res.status(200).json({ token });
  } catch (error) {
    throw new Error("Error logging in user");
  }
};
