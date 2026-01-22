import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { API_VERSION } from "../constants/basePathRoutes";
import { authUser } from "../auth/authUser";

const authRoutes = Router();
const userController = new UserController();

const BASE_PATH = API_VERSION.V1 + "/auth";

authRoutes.post(`${BASE_PATH}/login`, async (req, res, next) => {
  try {
    await userController.login(req, res);
  } catch (error) {
    next(error);
  }
});

authRoutes.post(`${BASE_PATH}/register`, async (req, res, next) => {
  try {
    await userController.register(req, res);
  } catch (error) {
    next(error);
  }
});

authRoutes.post(`${BASE_PATH}/refresh`, authUser, async (req, res, next) => {
  try {
    await userController.refreshToken(req, res);
  } catch (error) {
    next(error);
  }
});

export { authRoutes };
