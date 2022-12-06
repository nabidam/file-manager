// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import axios from "axios";
import fs from "fs";
import path from "path";
import Application from "@ioc:Adonis/Core/Application";

export default class UploadController {
  public uploadURL = async ({ logger, response, request }) => {
    logger.info({ r: request.all() });

    const inputUrl = request.input("url");
    try {
      const fileName = path.basename(inputUrl);
      const downloadPath = Application.appRoot + "/uploads";
      const localFilePath = path.resolve(downloadPath, fileName);
      const res = await axios.get(request.input("url"), {
        responseType: "stream",
      });

      const w = res.data.pipe(fs.createWriteStream(localFilePath));
      w.on("finish", () => {
        console.log("Successfully downloaded file!");
      });
      return response.json({ msg: "ok" });
    } catch (error) {
      console.error(error);
      return response.json({ msg: "no" });
    }
  };

  public uploadFile = async ({ logger, response, request }) => {
    logger.info({ r: request.all() });

    const inputUrl = request.input("url");
    try {
      const fileName = path.basename(inputUrl);
      const downloadPath = Application.appRoot + "/uploads";
      const localFilePath = path.resolve(downloadPath, fileName);
      const res = await axios.get(request.input("url"), {
        responseType: "stream",
      });

      const w = res.data.pipe(fs.createWriteStream(localFilePath));
      w.on("finish", () => {
        console.log("Successfully downloaded file!");
      });
      return response.json({ msg: "ok" });
    } catch (error) {
      console.error(error);
      return response.json({ msg: "no" });
    }
  };
}
