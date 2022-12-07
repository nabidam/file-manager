// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import fs from "fs";
import path from "path";
import Drive from "@ioc:Adonis/Core/Drive";
import Helper from "App/Classes/Helper";

export default class BaseController {
  public index = async ({ inertia, params, logger }) => {
    try {
      const path = `./uploads/`;
      let directories = fs
        .readdirSync(path, { withFileTypes: true })
        .filter((item) => item.isDirectory() && item.name[0] !== ".")
        .map((item) => ({ title: item.name, path: item.name, isFile: false }));

      let filesList = fs
        .readdirSync(path, { withFileTypes: true })
        .filter((item) => item.isFile() && item.name[0] !== ".")
        .map(async (item) => {
          const fileStats = await Drive.getStats(item.name);
          const fileSize = Helper.sizeFormatter(fileStats.size);
          return {
            title: item.name,
            path: item.name,
            size: fileSize,
            isFile: true,
          };
        });

      const files = await Promise.all(filesList);

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

        let filesList = fs
          .readdirSync(localPath, { withFileTypes: true })
          .filter((item) => item.isFile() && item.name[0] !== ".")
          .map(async (item) => {
            const fileStats = await Drive.getStats(`${inputPath}/${item.name}`);
            const fileSize = Helper.sizeFormatter(fileStats.size);
            return {
              title: item.name,
              path: `${inputPath}/${item.name}`,
              size: fileSize,
              isFile: true,
            };
          });

        const files = await Promise.all(filesList);

        logger.info({ r: params, directories, files });
        console.info({ r: params, directories, files });
        return inertia.render("Files", { files, directories });
      }
    } catch (error) {
      logger.error(error);
      return inertia.render("404");
    }
  };
}
