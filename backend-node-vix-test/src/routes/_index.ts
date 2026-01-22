import { Router } from "express";
import { brandMasterRoutes } from "./brandMaster.routes";
import { vMRoutes } from "./vM.routes";
import { uploadsRoutes } from "./uploads.routes";
import authRoutes from "./auth.routes";
import { API_VERSION } from "../constants/basePathRoutes";


export const routes = Router();


routes.get(API_VERSION.MAIN, (req, res) => {
    res.status(200).json({ ok: true });
});


routes.use(`${API_VERSION.MAIN}/auth`, authRoutes);
routes.use(uploadsRoutes);
routes.use(brandMasterRoutes);
routes.use(vMRoutes);
