import { createBrowserRouter } from "react-router-dom";
import { mainRoutes } from "./_routes";

export const appRoutes = createBrowserRouter(mainRoutes, {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});
