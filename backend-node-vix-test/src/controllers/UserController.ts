import { Response } from "express";
import { STATUS_CODE } from "../constants/statusCode";
import { UserService } from "../services/UserService";
import { CustomRequest } from "../types/custom";

export class UserController {
  constructor() {}
  private vMService = new UserService();

  async getById(req: CustomRequest<unknown>, res: Response) {
    const { idUser } = req.params;
    const result = await this.vMService.getById(idUser);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async createUser(req: CustomRequest<unknown>, res: Response) {
    // const user = req.user as user;
    const result = await this.vMService.createNewUser(req.body);
    return res.status(STATUS_CODE.CREATED).json(result);
  }

  async updateUser(req: CustomRequest<unknown>, res: Response) {
    const { idUser } = req.params;
    // const user = req.user as user;
    const result = await this.vMService.updateUser(idUser, req.body);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async deleteUser(req: CustomRequest<unknown>, res: Response) {
    const { idUser } = req.params;
    // const user = req.user as user;
    const result = await this.vMService.deleteUser(idUser);
    return res.status(STATUS_CODE.OK).json(result);
  }
}
