import { Request, Response } from "express";
import { UserService } from "../services/UserServices";
import { STATUS_CODE } from "../constants/statusCode";

export class UserController {
  private userService = new UserService();
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const result = await this.userService.authenticate({ email, password });

    return res.status(STATUS_CODE.OK).json(result);
  }

  async register(req: Request, res: Response) {
    const result = await this.userService.create(req.body);
    return res.status(STATUS_CODE.CREATED).json(result);
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const { idUser } = req.params;

      if (!idUser || typeof idUser !== "string") {
        return res.status(STATUS_CODE.BAD_REQUEST).json({
          message: "ID de usuário inválido."
        });
      }

      const result = await this.userService.generateNewToken(idUser);

      return res.status(STATUS_CODE.OK).json(result);
    } catch (error) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
        message: "Erro ao atualizar token de acesso."
      });
    }
  }
}