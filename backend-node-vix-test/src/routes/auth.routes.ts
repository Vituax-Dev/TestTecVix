import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { API_VERSION, ROOT_PATH } from "../constants/basePathRoutes";

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.AUTH;

const authRoutes = Router();

export const makeAuthController = () => {
  return new AuthController();
};

const authController = makeAuthController();

authRoutes.post(`${BASE_PATH}/login`, async (req, res) => {
  await authController.login(req, res);
});

authRoutes.post(`${BASE_PATH}/register`, async (req, res) => {
  await authController.register(req, res);
});

export { authRoutes };
