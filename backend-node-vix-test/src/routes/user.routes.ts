import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { API_VERSION, ROOT_PATH } from "../constants/basePathRoutes";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.USERS;

const userRoutes = Router();

userRoutes.use(ensureAuthenticated);

export const makeUserController = () => {
  return new UserController();
};

const userController = makeUserController();

userRoutes.get(BASE_PATH, async (req, res) => {
  await userController.list(req, res);
});

userRoutes.get(`${BASE_PATH}/:id`, async (req, res) => {
  await userController.listById(req, res);
});

userRoutes.put(`${BASE_PATH}/:id`, async (req, res) => {
  await userController.update(req, res);
});

userRoutes.delete(`${BASE_PATH}/:id`, async (req, res) => {
  await userController.delete(req, res);
});

export { userRoutes };
