import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { API_VERSION } from "../constants/basePathRoutes";
import { authUser } from "../auth/authUser";
import { canCreate, canUpdate, canDelete } from "../auth/permissions";

const BASE_PATH = API_VERSION.V1 + "/users";

const userRoutes = Router();

export const makeUserController = () => {
  return new UserController();
};

const userController = makeUserController();

userRoutes.post(`${BASE_PATH}/login`, async (req, res) => {
  await userController.login(req, res);
});

userRoutes.get(`${BASE_PATH}/me`, authUser, async (req, res) => {
  await userController.getMe(req, res);
});

userRoutes.get(`${BASE_PATH}`, authUser, async (req, res) => {
  await userController.listAll(req, res);
});

userRoutes.get(`${BASE_PATH}/:idUser`, authUser, async (req, res) => {
  await userController.getById(req, res);
});

userRoutes.post(`${BASE_PATH}`, authUser, canCreate, async (req, res) => {
  await userController.createUser(req, res);
});

userRoutes.put(
  `${BASE_PATH}/:idUser`,
  authUser,
  canUpdate,
  async (req, res) => {
    await userController.updateUser(req, res);
  },
);

userRoutes.delete(
  `${BASE_PATH}/:idUser`,
  authUser,
  canDelete,
  async (req, res) => {
    await userController.deleteUser(req, res);
  },
);

export { userRoutes };
