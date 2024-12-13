import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    JWT_SECRET
  );

  console.log("Generated Token:", token);
  return token;
};

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
