import { UserModel } from "../models/users.js";
import { validateUser, validatePartialUser } from "../schemas/users.js";

export class UserController {
  static async getAll(req, res) {
    const { lastname } = req.query;
    const users = await UserModel.getAll({ lastname });
    return res.status(200).json(users);
  }
  static async getByID(req, res) {
    const { id } = req.params;
    const user = await UserModel.getById({ id });
    if (user) return res.status(200).json(user);
    res.status(404).json({ msj: "resource NOT FOUND" });
  }
  static async create(req, res) {
    const result = validateUser(req.body);
    if (!result.success) {
      // 422 Unprocesable Entity
      return res.status(422).json({ error: JSON.parse(result.error.message) });
    }
    const newUser = await UserModel.create({ input: result.data });
    if (newUser) return res.status(201).json(newUser);
    return res.status(400).json({ msj: "User not created" });
  }
  static async update(req, res) {
    const result = validatePartialUser(req.body);
    //Body data validation
    if (!result.success)
      return res.status(422).json({ error: JSON.parse(result.error.message) });

    const { id } = req.params;
    const updatedUser = UserModel.update({ id: id, input: result.data });

    if (updatedUser) return res.status(201).json(updatedUser);
    return res.status(400).json({ error: "Could not update the user" });
  }
  static async delete(req, res) {
    const { id } = req.params;

    const result = await UserModel.delete({ id });

    if (result) return res.status(200).json({ message: "User deleted" });
    return res.status(400).json({ error: "Could not delete the user" });
  }
}
