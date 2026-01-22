import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { API_VERSION, ROOT_PATH } from "../constants/basePathRoutes";
import { authUser } from "../auth/authUser";
import { isAdmin } from "../auth/isAdmin";
import { isManagerOrIsAdmin } from "../auth/isManagerOrIsAdmin";

const userRoutes = Router();
const userController = new UserController();

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.USER;

// List all users - manager or admin only
userRoutes.get(
  `${BASE_PATH}`,
  authUser,
  isManagerOrIsAdmin,
  async (req, res, next) => {
    try {
      await userController.listAll(req, res);
    } catch (error) {
      next(error);
    }
  },
);

// Get user by ID - authenticated users
userRoutes.get(`${BASE_PATH}/:idUser`, authUser, async (req, res, next) => {
  try {
    await userController.getById(req, res);
  } catch (error) {
    next(error);
  }
});

// Update user - manager or admin only
userRoutes.put(
  `${BASE_PATH}/:idUser`,
  authUser,
  isManagerOrIsAdmin,
  async (req, res, next) => {
    try {
      await userController.update(req, res);
    } catch (error) {
      next(error);
    }
  },
);

// Delete user - admin only
userRoutes.delete(
  `${BASE_PATH}/:idUser`,
  authUser,
  isAdmin,
  async (req, res, next) => {
    try {
      await userController.delete(req, res);
    } catch (error) {
      next(error);
    }
  },
);

export { userRoutes };
