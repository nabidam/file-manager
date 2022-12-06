/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/test", async ({ inertia }) => {
  return inertia.render("Test");
});

Route.get("/files", "BaseController.index").namespace(
  "App/Controllers/Http/Storage"
);

Route.get("/files/*", "BaseController.route").namespace(
  "App/Controllers/Http/Storage"
);

Route.post("/upload-url", "UploadController.uploadURL").namespace(
  "App/Controllers/Http/Storage"
);

Route.post("/upload-file", "UploadController.uploadFile").namespace(
  "App/Controllers/Http/Storage"
);
