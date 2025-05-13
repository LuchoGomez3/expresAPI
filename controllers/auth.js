import { AuthModel } from "../models/auth.js";

export class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;

    const token = await AuthModel.login({ email, password });
    if (!token) return res.status(401).json({ error: "User not found" });
    res.status(200).json({ token });
  }

  static async register(req, res) {
    pass;
  }
}
