import { Response } from "express";
import { CustomRequest } from "../types/custom";
import { LoginService } from "../services/LoginService";
import { STATUS_CODE } from "../constants/statusCode";
import { COOKIE_OPTIONS } from "../utils/cookie";

export class LoginController {
  private loginService = new LoginService();

  async login(req: CustomRequest<unknown>, res: Response) {
    const result = await this.loginService.login(req.body);

    res.cookie("token", result.token, COOKIE_OPTIONS);

    return res.status(STATUS_CODE.OK).json({ user: result.user });
  }

  async logout(_req: CustomRequest<unknown>, res: Response) {
    const { httpOnly, secure, sameSite } = COOKIE_OPTIONS;
    res.clearCookie("token", { httpOnly, secure, sameSite });

    return res.status(STATUS_CODE.OK).json({ message: "Logged out" });
  }
}
