import React from "react";
import { RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { appRoutes } from "./routes/_index";
import "./configs/i18n";

function App() {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={appRoutes} />
    </>
  );
}

export default App;