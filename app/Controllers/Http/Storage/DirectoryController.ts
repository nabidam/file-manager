// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import fs from "fs";
import path from "path";

export default class DirectoryController {
  public create = async ({ response, request, logger }) => {
    try {
      const dirpath = path.join(
        `./uploads/`,
        request.input("where"),
        request.input("name")
      );
      await fs.promises.mkdir(dirpath, { recursive: true });

      return response.json({ msg: "ok" });
    } catch (error) {
      logger.error(error);
      return response.json({ msg: "no" });
    }
  };
}
