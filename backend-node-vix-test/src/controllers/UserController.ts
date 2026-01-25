import { Request, Response } from "express";
import { UserService } from "../services/UserServices";
import { STATUS_CODE } from "../constants/statusCode";
import { prisma } from "../database/client";

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

  async update(req: Request, res: Response) {
    const { idUser } = req.params;
    const data = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: { idUser: String(idUser) },
        data: {
          fullName: data.fullName,
          username: data.username,
          email: data.email,
          phone: data.phone,
          profileImgUrl: data.profileImgUrl,
          ...(data.password && { password: data.password }),
        },
      });

      return res.status(200).json({ data: updatedUser });
    } catch (error) {
      return res.status(400).json({ message: "Erro ao atualizar usuário", error });
    }
  }
}