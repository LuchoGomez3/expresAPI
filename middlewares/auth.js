import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();
const { JWT_SECRET } = process.env;

export function verifyToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(403).json({ message: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Añadir el usuario a la request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
}
