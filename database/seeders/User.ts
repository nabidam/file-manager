import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import User from "App/Models/User";
import Env from "@ioc:Adonis/Core/Env";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await User.createMany([
      { email: "navid@naff.ir", password: Env.get("NAVID_PASSWORD") },
    ]);
  }
}
