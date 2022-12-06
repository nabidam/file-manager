// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import fs from "fs";

export default class BaseController {
  public index = async ({ inertia, params, logger }) => {
    try {
      const path = `./uploads/`;
      const directories = fs
        .readdirSync(path, { withFileTypes: true })
        .filter((item) => item.isDirectory() && item.name[0] !== ".")
        .map((item) => ({ title: item.name, path: item.name }));

      const files = fs
        .readdirSync(path, { withFileTypes: true })
        .filter((item) => item.isFile() && item.name[0] !== ".")
        .map((item) => ({ title: item.name, path: item.name }));

      logger.info({ r: params, directories, files });
      return inertia.render("Files", { files, directories });
    } catch (error) {
      logger.error(error);
      return inertia.render("404");
    }
  };

  public route = async ({ inertia, params, logger, response }) => {
    try {
      const inputPath = params["*"] ? params["*"].join("/") : "";
      const path = `./uploads/${inputPath}`;

      const existance = fs.existsSync(path);
      const isFile = fs.lstatSync(path).isFile();
      const isDirectory = fs.lstatSync(path).isDirectory();

      if (!existance) throw new Error("Not Found");

      if (isFile) {
        response.download(path);
      }
      if (isDirectory) {
        const directories = fs
          .readdirSync(path, { withFileTypes: true })
          .filter((item) => item.isDirectory() && item.name[0] !== ".")
          .map((item) => ({
            title: item.name,
            path: `${inputPath}/${item.name}`,
          }));

        const files = fs
          .readdirSync(path, { withFileTypes: true })
          .filter((item) => item.isFile() && item.name[0] !== ".")
          .map((item) => ({
            title: item.name,
            path: `${inputPath}/${item.name}`,
          }));

        logger.info({ r: params, directories, files });
        return inertia.render("Files", { files, directories });
      }
    } catch (error) {
      logger.error(error);
      return inertia.render("404");
    }
  };
}
