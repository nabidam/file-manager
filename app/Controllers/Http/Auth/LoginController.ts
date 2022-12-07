// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginController {
  public async index({ auth, inertia, response }) {
    if (await auth.check()) return response.redirect("/files");
    return inertia.render("Login");
  }

  public async login({ request, auth, response }) {
    const email = request.input("email");
    const password = request.input("password");

    try {
      await auth.use("web").attempt(email, password);
      response.json({ msg: "ok" });
    } catch {
      return response.badRequest("Invalid credentials");
    }
  }
}
