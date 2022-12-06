import { InertiaApp } from "@inertiajs/inertia-react";
import React from "react";
import { render } from "react-dom";
import "../css/app.css";
import SnackbarProvider from "react-simple-snackbar";

const el = document.getElementById("app");

render(
  <SnackbarProvider>
    <InertiaApp
      // Pass props from the server down to the client app
      initialPage={JSON.parse(el?.dataset.page as string)}
      // Dynamically load the required page component
      resolveComponent={(name) =>
        import(`./Pages/${name}`).then((module) => module.default)
      }
      initialComponent={undefined}
    />
  </SnackbarProvider>,
  el
);
