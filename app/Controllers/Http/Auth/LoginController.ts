// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginController {
  public index({ inertia }) {
    return inertia.render("Login");
  }
}
