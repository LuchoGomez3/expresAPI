import { readFileSync, writeFileSync } from "fs";
import { hashSync } from "bcryptjs";

// Leer el archivo original
const users = JSON.parse(readFileSync("./users.json", "utf8"));

// Hashear las contraseñas
const usersHashed = users.map((user) => ({
  ...user,
  password: hashSync(user.password, 10),
}));

// Guardar los usuarios actualizados en un nuevo archivo (o sobrescribí el mismo)
writeFileSync("./users_hashed.json", JSON.stringify(usersHashed, null, 2));

console.log("Contraseñas hasheadas correctamente");
