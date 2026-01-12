import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { API_VERSION } from "../constants/basePathRoutes";
import { authUser } from "../auth/authUser";
import { isAdmin } from "../auth/isAdmin";
import { isManagerOrIsAdmin } from "../auth/isManagerOrIsAdmin";

const BASE_PATH = API_VERSION.V1 + "/user";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post(`${BASE_PATH}/register`, async (req, res) => {
  await userController.register(req, res);
});

userRoutes.post(`${BASE_PATH}/login`, async (req, res) => {
  await userController.login(req, res);
});

userRoutes.get(`${BASE_PATH}/token/:idUser`, authUser, async (req, res) => {
  await userController.refreshToken(req, res);
});

userRoutes.get(`${BASE_PATH}/:idUser`, authUser, async (req, res) => {
  await userController.getById(req, res);
});

userRoutes.get(
  `${BASE_PATH}`,
  authUser,
  isManagerOrIsAdmin,
  async (req, res) => {
    await userController.listAll(req, res);
  },
);

userRoutes.put(`${BASE_PATH}/:idUser`, authUser, async (req, res) => {
  await userController.update(req, res);
});

userRoutes.put(`${BASE_PATH}/:idUser/password`, authUser, async (req, res) => {
  await userController.updatePassword(req, res);
});

userRoutes.delete(
  `${BASE_PATH}/:idUser`,
  authUser,
  isAdmin,
  async (req, res) => {
    await userController.delete(req, res);
  },
);

export { userRoutes };
