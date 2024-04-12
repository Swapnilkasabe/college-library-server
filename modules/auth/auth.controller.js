import * as userService from "./user.service.js";

export const signup = async (req, res) => {
  try {
    const { user } = await userService.signup(req.body);
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    console.log(req.body);
    const { token } = await userService.login(req, res);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
