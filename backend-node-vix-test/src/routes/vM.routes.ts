import { Router } from "express";
import { VMController } from "../controllers/VMController";
import { API_VERSION, ROOT_PATH } from "../constants/basePathRoutes";
import { authUser } from "../auth/authUser";
import { hasRole } from "../auth/hasRole";
import { ERole } from "@prisma/client";

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.VM; // /api/v1/vm

const vMRoutes = Router();

export const makeVMController = () => {
  return new VMController();
};

const vMController = makeVMController();

// ========= GETs =========
vMRoutes.get(BASE_PATH, authUser, async (req, res) => {
  await vMController.listAll(req, res);
});

vMRoutes.get(`${BASE_PATH}/:idVM`, authUser, async (req, res) => {
  await vMController.getById(req, res);
});

// ========= POSTs =========
vMRoutes.post(
  BASE_PATH,
  authUser,
  hasRole([ERole.manager, ERole.admin]),
  async (req, res) => {
    await vMController.createVM(req, res);
  },
);

// ======== PUTs =========
vMRoutes.put(
  `${BASE_PATH}/:idVM`,
  authUser,
  hasRole([ERole.manager, ERole.admin]),
  async (req, res) => {
    await vMController.updateVM(req, res);
  },
);

// ======== DELETEs ========
vMRoutes.delete(
  `${BASE_PATH}/:idVM`,
  authUser,
  hasRole([ERole.admin]),
  async (req, res) => {
    await vMController.deleteVM(req, res);
  },
);

export { vMRoutes };
