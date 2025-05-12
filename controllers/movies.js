import { MovieModel } from "../models/movies.js";
import { validateMovie, validateUpdateMovie } from "../schemas/movie.js";

export class MovieController {
  static async getAll(req, res) {
    const { genre } = req.query;
    const movies = await MovieModel.getAll({ genre });
    res.status(200).json(movies);
  }

  static async getByID(req, res) {
    const { id } = req.params;

    const movie = await MovieModel.getById({ id });

    if (movie) return res.status(200).json(movie);

    res.status(404).json({ msj: "resource NOT FOUND" });
  }

  static async create(req, res) {
    const result = validateMovie(req.body);

    if (!result.success) {
      // 422 Unprocesable Entity
      return res.status(422).json({ error: JSON.parse(result.error.message) });
    }

    const newMovie = await MovieModel.create({ input: result.data });
    if (newMovie) return res.status(201).json(newMovie);
    return res.status(400).json({ msj: "Movie not created" });
  }

  static async update(req, res) {
    const result = validateUpdateMovie(req.body);
    const { id } = req.params;
    //Body data validation
    if (!result.success)
      return res.status(422).json({ error: JSON.parse(result.error.message) });

    const updatedMovie = MovieModel.update({ id: id, input: result.data });

    if (updatedMovie) return res.status(201).json(updatedMovie);
    return res.status(400).json({ error: "Could not update the movie" });
  }

  static async delete(req, res) {
    const { id } = req.params;

    const result = await MovieModel.delete({ id });

    if (result) return res.status(200).json({ message: "Movie deleted" });
    return res.status(400).json({ error: "Could not delete the movie" });
  }
}
