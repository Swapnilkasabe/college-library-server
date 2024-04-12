import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export const generateAuthToken = (user) => {
  const payload = {
    username: user.username,
    email: user.email,
    role: user.role,
    fullname: `${user.firstName} ${user.lastName}`,
  };
  console.log(payload, user.firstname, user.lastname);
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1hr" });
  return token;
};

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_LENGTH));
  return bcrypt.hash(password, salt);
};

export const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
