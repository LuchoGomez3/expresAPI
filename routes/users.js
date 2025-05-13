import { Router } from "express";
import { UserController } from "../controllers/users.js";

export const userRouter = Router();

userRouter.get("/", UserController.getAll);

userRouter.get("/:id", UserController.getByID);

userRouter.post("/", UserController.create);

userRouter.patch("/:id", UserController.update);

userRouter.delete("/:id", UserController.delete);
