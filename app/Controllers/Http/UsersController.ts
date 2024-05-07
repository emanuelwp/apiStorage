import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class UsersController {
  public async index({}: HttpContextContract) {
    const users = await User.all();
    return users;
  }

  public async store({ request }: HttpContextContract) {
    const body = request.body();
    const user = await User.create({
      name: body.name,
      email: body.email,
      password: body.password,
    });
    return user;
  }

  public async show({ request }: HttpContextContract) {
    const userId = request.param("id");
    const user = await User.findOrFail(userId);
    return user;
  }

  public async update({ request }: HttpContextContract) {
    const userId = request.param("id");
    const body = request.body();
    const user = await User.findOrFail(userId);
    await user.merge(body).save();
    return user;
  }

  public async destroy({ request }: HttpContextContract) {
    const userId = request.param("id");
    const user = await User.findOrFail(userId);
    await user.delete();
    return `User ${userId} was deleted`;
  }

  // public async create({}: HttpContextContract) {}

  // public async edit({}: HttpContextContract) {}
}
