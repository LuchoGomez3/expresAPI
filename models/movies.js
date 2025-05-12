import movies from "../movies.json" with { type: "json" };
import { randomUUID } from "node:crypto";

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      return movies.filter((movie) =>
        movie.generos.some((g) => g.toLowerCase() === genre.toLowerCase())
      );
    }
    return movies;
  }

  static async getById({ id }) {
    const movie = movies.find((m) => m.id === id);
    return movie;
  }

  static async create({ input }) {
    const newMovie = {
      id: randomUUID(),
      ...input,
    };

    movies.push(newMovie);
    return newMovie;
  }

  static async update({ input, id }) {
    const movieIndex = movies.findIndex((m) => m.id === id);
    if (movieIndex < 0) return false;

    const updatedMovie = {
      ...movies[movieIndex],
      ...input,
    };

    movies[movieIndex] = updatedMovie;

    return true;
  }

  static async delete({ id }) {
    const movieIndex = movies.findIndex((m) => m.id === id);
    if (movieIndex < 0) return false;
    movies.splice(movieIndex, 1);
    return true;
  }
}
