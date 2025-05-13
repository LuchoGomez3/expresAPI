import express from "express";
import { config } from "dotenv";
import { corsMiddleware } from "./middlewares/cors.js";
import { moviesRouter } from "./routes/movies.js";
import { userRouter } from "./routes/users.js";
import { authRouter } from "./routes/auth.js";

config();
const { PORT, URL_LOCAL } = process.env;

const app = express();

// Middlewares
app.disable("x-powered-by");
app.use(express.json());
app.use(corsMiddleware());

// MAIN
app.get("/", (req, res, next) => {
  res.status(200).send("<h1>Hola Mundo con express</h1>");
});

// ROUTES
app.use("/auth", authRouter);
app.use("/movies", moviesRouter);
app.use("/users", userRouter);

// NOT FOUND
app.use(() => {
  res.status(404);
  res.send("<h1>NOT FOUND 404</h1>");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${URL_LOCAL}`);
});
