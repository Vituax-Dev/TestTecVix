import { Router } from "express";
import { LoginController } from "../controllers/LoginController";
import { API_VERSION, ROOT_PATH } from "../constants/basePathRoutes";

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.USER; // /api/v1/user

const loginRoutes = Router();

export const makeLoginController = () => {
  return new LoginController();
};

const loginController = makeLoginController();

// ========= POSTs =========
loginRoutes.post(`${BASE_PATH}/login`, async (req, res) => {
  await loginController.login(req, res);
});

loginRoutes.post(`${BASE_PATH}/logout`, async (req, res) => {
  await loginController.logout(req, res);
});

export { loginRoutes };
