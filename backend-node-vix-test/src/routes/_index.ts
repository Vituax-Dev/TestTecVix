import { Router } from "express";
import { brandMasterRoutes } from "./brandMaster.routes";
import { uploadsRoutes } from "./uploads.routes";
import userRoutes from "./user.routes";
import { vMRoutes } from "./vM.routes";

export const routes = Router();

routes.use(uploadsRoutes);
routes.use(brandMasterRoutes);
routes.use(vMRoutes);
routes.use(userRoutes);
