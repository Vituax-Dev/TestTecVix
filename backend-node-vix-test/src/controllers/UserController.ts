import { Response } from "express";
import { CustomRequest } from "../types/custom";
import { UserService } from "../services/UserService";
import { user } from "@prisma/client";
import { STATUS_CODE } from "../constants/statusCode";

export class UserController {
  private userService = new UserService();

  constructor() {}

  async getById(req: CustomRequest<unknown>, res: Response) {
    const user = req.user as user;
    const { idUser } = req.params;
    if (typeof idUser !== "string") {
      return res.status(STATUS_CODE.BAD_REQUEST).json({ message: "ID do usuário inválido" });
    }
    const result = await this.userService.getById(idUser, user);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async listAll(req: CustomRequest<unknown>, res: Response) {
    const user = req.user as user;
    const result = await this.userService.listAll(req.query, user);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async createUser(req: CustomRequest<unknown>, res: Response) {
    const user = req.user as user;
    const result = await this.userService.createUser(req.body, user);
    return res.status(STATUS_CODE.CREATED).json(result);
  }

  async updateUser(req: CustomRequest<unknown>, res: Response) {
    const user = req.user as user;
    const { idUser } = req.params;
    if (typeof idUser !== "string") {
      return res.status(STATUS_CODE.BAD_REQUEST).json({ message: "ID do usuário inválido" });
    }
    const result = await this.userService.updateUser(idUser, req.body, user);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async deleteUser(req: CustomRequest<unknown>, res: Response) {
    const user = req.user as user;
    const { idUser } = req.params;
    if (typeof idUser !== "string") {
      return res.status(STATUS_CODE.BAD_REQUEST).json({ message: "ID do usuário inválido" });
    }
    const result = await this.userService.deleteUser(idUser, user);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async login(req: CustomRequest<unknown>, res: Response) {
    const { email, password } = req.body;
    const user = await this.userService.verifyCredentials(email, password);
    return res.status(STATUS_CODE.OK).json({
      message: "Login realizado com sucesso",
      user,
    });
  }

  async getMe(req: CustomRequest<unknown>, res: Response) {
    const user = req.user as user;
    const result = await this.userService.getById(user.idUser, user);
    return res.status(STATUS_CODE.OK).json(result);
  }
}
