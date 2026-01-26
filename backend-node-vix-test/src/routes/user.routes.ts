import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { API_VERSION, ROOT_PATH } from "../constants/basePathRoutes";
import { authUser } from "../auth/authUser";
import { hasRole } from "../auth/hasRole";
import { ERole } from "@prisma/client";

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.USER; // /api/v1/user

const userRoutes = Router();

export const makeUserController = () => {
  return new UserController();
};

const userController = makeUserController();

// ========= GETs =========
userRoutes.get(BASE_PATH, authUser, async (req, res) => {
  await userController.listAll(req, res);
});

// Rota para buscar o próprio perfil (deve vir antes de /:idUser)
userRoutes.get(`${BASE_PATH}/me`, authUser, async (req, res) => {
  await userController.getMe(req, res);
});

userRoutes.get(`${BASE_PATH}/:idUser`, authUser, async (req, res) => {
  await userController.getById(req, res);
});

// ========= POSTs =========
// Rota pública para auto-registro
userRoutes.post(`${BASE_PATH}/register`, async (req, res) => {
  await userController.register(req, res);
});

// Rota para managers/admins criarem usuários
userRoutes.post(
  `${BASE_PATH}`,
  authUser,
  hasRole([ERole.manager, ERole.admin]),
  async (req, res) => {
    await userController.createUser(req, res);
  },
);

// ======== PUTs =========
// Rota para editar o próprio perfil (qualquer usuário autenticado)
userRoutes.put(`${BASE_PATH}/me`, authUser, async (req, res) => {
  await userController.updateMe(req, res);
});

// Rota para editar outros usuários (apenas manager/admin)
userRoutes.put(
  `${BASE_PATH}/:idUser`,
  authUser,
  hasRole([ERole.manager, ERole.admin]),
  async (req, res) => {
    await userController.updateUser(req, res);
  },
);

// ======== DELETEs ========
userRoutes.delete(
  `${BASE_PATH}/:idUser`,
  authUser,
  hasRole([ERole.admin]),
  async (req, res) => {
    await userController.deleteUser(req, res);
  },
);

export { userRoutes };
