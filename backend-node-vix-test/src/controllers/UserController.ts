import { Request, Response } from "express";
import { UserService } from "../services/UserServices";
import { STATUS_CODE } from "../constants/statusCode";

export class UserController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const userService = new UserService();

    const result = await userService.authenticate({ email, password });

    return res.status(STATUS_CODE.OK).json(result);
  }
}