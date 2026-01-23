import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { API_VERSION, ROOT_PATH } from "../constants/basePathRoutes";


const BASE_PATH = API_VERSION.V1 + "/user"; 

const userRoutes = Router();

export const makeUserController = () => {
  return new UserController();
};

const userController = makeUserController();

userRoutes.post(
  `${BASE_PATH}/login`,
  async (req, res) => {
    await userController.login(req, res);
  },
);

userRoutes.post(`${BASE_PATH}/register`, async (req, res) => {
  await userController.register(req, res);
});

userRoutes.get(`${BASE_PATH}/token/:idUser`, async (req, res) => {
  await userController.refreshToken(req, res);
});

export { userRoutes };