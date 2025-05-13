import users from "../users.json" with { type: "json" };
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

config();
const { JWT_SECRET, JWT_ALGORITHM, JWT_EXPIRATION } = process.env;

export class AuthModel {
  static async login({ email, password }) {
    const user = users.find((u) => u.email === email);
    if (!user) return false;

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return false;

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
      algorithm: JWT_ALGORITHM,
    });

    if (!token) return false;

    return token;
  }
}
