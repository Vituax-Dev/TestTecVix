import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { API_VERSION, ROOT_PATH } from "../constants/basePathRoutes";

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.USER; // /api/v1/user

const userRoutes = Router();

export const makeUserController = () => {
  return new UserController();
};

const userController = makeUserController();

// ========= POSTs (public) =========
userRoutes.post(`${BASE_PATH}`, async (req, res) => {
  await userController.register(req, res);
});

export { userRoutes };
