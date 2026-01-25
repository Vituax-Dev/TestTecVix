import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { API_VERSION, ROOT_PATH } from "../constants/basePathRoutes";
import { authUser } from "../auth/authUser";
import { isAdmin } from "../auth/isAdmin";
import { isManagerOrIsAdmin } from "../auth/isManagerOrIsAdmin";

const userRoutes = Router();
const userController = new UserController();

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.USER;

// Update profile settings (user data + company notifications) - authenticated users
// Uses transaction for atomicity - if one fails, all changes are rolled back
userRoutes.put(
  `${BASE_PATH}/profile-settings`,
  authUser,
  async (req, res, next) => {
    try {
      await userController.updateProfileSettings(req, res);
    } catch (error) {
      next(error);
    }
  },
);

// Create new user - manager or admin only
userRoutes.post(
  `${BASE_PATH}/new-user`,
  authUser,
  isManagerOrIsAdmin,
  async (req, res, next) => {
    try {
      await userController.createByManager(req, res);
    } catch (error) {
      next(error);
    }
  },
);

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

// Deactivate user - admin only
userRoutes.patch(
  `${BASE_PATH}/:idUser/deactivate`,
  authUser,
  isAdmin,
  async (req, res, next) => {
    try {
      await userController.deactivate(req, res);
    } catch (error) {
      next(error);
    }
  },
);

// Reactivate user - admin only
userRoutes.patch(
  `${BASE_PATH}/:idUser/reactivate`,
  authUser,
  isAdmin,
  async (req, res, next) => {
    try {
      await userController.reactivate(req, res);
    } catch (error) {
      next(error);
    }
  },
);

export { userRoutes };
