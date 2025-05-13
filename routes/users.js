import { Router } from "express";
import { UserController } from "../controllers/users.js";
import { verifyToken } from "../middlewares/auth.js";

export const userRouter = Router();

userRouter.get("/", verifyToken, UserController.getAll);

userRouter.get("/:id", verifyToken, UserController.getByID);

userRouter.post("/", UserController.create);

userRouter.patch("/:id", verifyToken, UserController.update);

userRouter.delete("/:id", verifyToken, UserController.delete);
