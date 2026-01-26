import { Response } from "express";
import { CustomRequest } from "../types/custom";
import { UserService } from "../services/UserService";
import { STATUS_CODE } from "../constants/statusCode";
import { user } from "@prisma/client";
import { idUserParamsSchema } from "../types/validations/User/userParams";

export class UserController {
  constructor() {}
  private userService = new UserService();

  async getById(req: CustomRequest<unknown>, res: Response) {
    const { idUser } = idUserParamsSchema.parse(req.params);
    const currentUser = req.user as user;

    const result = await this.userService.getById(
      idUser,
      currentUser.idBrandMaster,
    );
    return res.status(STATUS_CODE.OK).json(result);
  }

  async getMe(req: CustomRequest<unknown>, res: Response) {
    const currentUser = req.user as user;
    const result = await this.userService.getById(
      currentUser.idUser,
      currentUser.idBrandMaster,
    );
    return res.status(STATUS_CODE.OK).json(result);
  }

  async listAll(req: CustomRequest<unknown>, res: Response) {
    const currentUser = req.user as user;
    const result = await this.userService.listAll(req.query, currentUser);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async register(req: CustomRequest<unknown>, res: Response) {
    const result = await this.userService.register(req.body);
    return res.status(STATUS_CODE.CREATED).json(result);
  }

  async createUser(req: CustomRequest<unknown>, res: Response) {
    const currentUser = req.user as user;
    const result = await this.userService.createUser(req.body, currentUser);
    return res.status(STATUS_CODE.CREATED).json(result);
  }

  async updateMe(req: CustomRequest<unknown>, res: Response) {
    const currentUser = req.user as user;
    const result = await this.userService.updateMe(
      currentUser.idUser,
      req.body,
    );
    return res.status(STATUS_CODE.OK).json(result);
  }

  async updateUser(req: CustomRequest<unknown>, res: Response) {
    const { idUser } = idUserParamsSchema.parse(req.params);
    const currentUser = req.user as user;
    await this.userService.updateUser(idUser, req.body, currentUser);
    return res.status(STATUS_CODE.NO_CONTENT).send();
  }

  async deleteUser(req: CustomRequest<unknown>, res: Response) {
    const { idUser } = idUserParamsSchema.parse(req.params);
    const currentUser = req.user as user;
    await this.userService.deleteUser(idUser, currentUser);
    return res.status(STATUS_CODE.NO_CONTENT).send();
  }
}
