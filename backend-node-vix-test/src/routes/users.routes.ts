import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { API_VERSION, ROOT_PATH } from "../constants/basePathRoutes";
// import { authUser } from "../auth/authUser";
// import { isAdmin } from "../auth/isAdmin";

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.USER;

const usersRoutes = Router();



export const makeUserController = () => {
  return new UserController();
};

const userController = makeUserController();

// ========= GETs =========
usersRoutes.get(BASE_PATH, async (req, res) => {
  await userController.listAll(req, res);
});

usersRoutes.get(`${BASE_PATH}/:idUser`, async (req, res) => {
  await userController.getById(req, res);
});

// ========= POST =========
usersRoutes.post(BASE_PATH, async (req, res) => {
  await userController.createUser(req, res);
});

// ========= PUT =========
usersRoutes.put(`${BASE_PATH}/:idUser`, async (req, res) => {
  await userController.updateUser(req, res);
});

// ========= DELETE =========
usersRoutes.delete(`${BASE_PATH}/:idUser`, async (req, res) => {
  await userController.deleteUser(req, res);
});

export { usersRoutes };
