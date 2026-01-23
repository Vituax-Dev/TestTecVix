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
}