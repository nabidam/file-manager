// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import fs from "fs";
import path from "path";

export default class BaseController {
  public index = async ({ inertia, params, logger }) => {
    try {
      const path = `./uploads/`;
      let directories = fs
        .readdirSync(path, { withFileTypes: true })
        .filter((item) => item.isDirectory() && item.name[0] !== ".")
        .map((item) => ({ title: item.name, path: item.name, isFile: false }));

      let files = fs
        .readdirSync(path, { withFileTypes: true })
        .filter((item) => item.isFile() && item.name[0] !== ".")
        .map((item) => ({ title: item.name, path: item.name, isFile: true }));

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
      const localPath = `./uploads/${inputPath}`;

      const existance = fs.existsSync(localPath);
      const isFile = fs.lstatSync(localPath).isFile();
      const isDirectory = fs.lstatSync(localPath).isDirectory();

      if (!existance) throw new Error("Not Found");

      if (isFile) {
        response.download(localPath);
      }
      if (isDirectory) {
        let directories = fs
          .readdirSync(localPath, { withFileTypes: true })
          .filter((item) => item.isDirectory() && item.name[0] !== ".")
          .map((item) => ({
            title: item.name,
            path: `${inputPath}/${item.name}`,
            isFile: false,
          }));

        directories.unshift({
          title: "..",
          path: path.join(inputPath, ".."),
          isFile: false,
        });
        let files = fs
          .readdirSync(localPath, { withFileTypes: true })
          .filter((item) => item.isFile() && item.name[0] !== ".")
          .map((item) => ({
            title: item.name,
            path: `${inputPath}/${item.name}`,
            isFile: true,
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
