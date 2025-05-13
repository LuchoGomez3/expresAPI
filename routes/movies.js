import { Router } from "express";
import { MovieController } from "../controllers/movies.js";
import { verifyToken } from "../middlewares/auth.js";

export const moviesRouter = Router();

moviesRouter.get("/", MovieController.getAll);

moviesRouter.get("/:id", MovieController.getByID);

moviesRouter.post("/", verifyToken, MovieController.create);

moviesRouter.patch("/:id", verifyToken, MovieController.update);

moviesRouter.delete("/:id", verifyToken, MovieController.delete);
