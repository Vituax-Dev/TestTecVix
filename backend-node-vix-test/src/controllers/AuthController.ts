import { Response } from "express";
import { CustomRequest } from "../types/custom";
import { AuthService } from "../services/AuthService";
import { STATUS_CODE } from "../constants/statusCode";

export class AuthController {
  constructor() {}
  private authService = new AuthService();

  async login(req: CustomRequest<unknown>, res: Response) {
    const result = await this.authService.login(req.body);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async register(req: CustomRequest<unknown>, res: Response) {
    const result = await this.authService.register(req.body);
    return res.status(STATUS_CODE.CREATED).json(result);
  }

  async getNewToken(req: CustomRequest<unknown>, res: Response) {
    const { idUser } = req.params;

    const result = await this.authService.getNewToken(idUser);

    return res.status(STATUS_CODE.OK).json(result);
  }
}
