import { z } from "zod";
import { titleValidation } from "./validations/stringValidations.js";
const movieSchema = z.object({
  titulo_original: z.string(),
  año: z.number().int().min(1900).max(2032),
  director: z.string(),
  actores_principales: z.array(z.string()),
  generos: z.array(z.enum(["Acción", "Crimen", "Drama"])),
  duracion: z.number().positive(),
  clasificacion: z.string(),
  sinopsis: z.string(),
  puntaje_imdb: z.number().min(0).max(10),
  poster: z.string().url(),
});

export function validateMovie(object) {
  return movieSchema.safeParse(object);
}

export function validateUpdateMovie(object) {
  return movieSchema.partial().safeParse(object);
}
