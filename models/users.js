import users from "../users.json" with { type: "json" };
import { randomUUID } from "node:crypto";

export class UserModel {
  static async getAll({ lastname }) {
    if (lastname) {
      return users.filter((u) => u.lastname === lastname);
    }
    return users;
  }
  static async getById({ id }) {
    const user = users.find((u) => u.id === id);
    return user;
  }
  static async create({ input }) {
    const newUser = {
      id: randomUUID(),
      ...input,
    };
    users.push(newUser);
    return newUser;
  }
  static async update({ input, id }) {
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex < 0) return false;
    const updatedUser = {
      ...users[userIndex],
      ...input,
    };
    users[userIndex] = updatedUser;
    return true;
  }
  static async delete({ id }) {
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex < 0) return false;
    users.splice(userIndex, 1);
    return true;
  }
}
