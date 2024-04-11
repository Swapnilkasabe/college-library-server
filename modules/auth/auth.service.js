import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const generateAuthToken = (user) => {
  const payload = {
    username: user.username,
    email: user.email,
    role: user.role,
    fullname: `${user.firstName} ${user.lastName}`,
  };
  console.log(payload, user.firstname, user.lastname);
  const token = jwt.sign(payload, "top_secret_key", { expiresIn: "1hr" });
  return token;
};

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
