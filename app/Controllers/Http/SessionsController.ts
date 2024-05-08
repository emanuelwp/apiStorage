import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class SessionsController {
  public async store({ auth, request, response }: HttpContextContract) {
    try {
      const email = request.input("email");
      const password = request.input("password");
      const token = await auth.use("api").attempt(email, password, {
        expiresIn: "2 hours",
      });
      return token;
    } catch {
      return response.unauthorized("Invalid credentials");
    }
  }

  public async show({ auth, response }: HttpContextContract) {
    try {
      await auth.use("api").authenticate();
      return `Olá ${auth.user?.name}, você está autenticado(a)!`;
    } catch {
      return response.unauthorized("Invalid credentials");
    }
  }
}
