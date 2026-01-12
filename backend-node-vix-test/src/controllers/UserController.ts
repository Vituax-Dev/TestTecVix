import { Response } from "express";
import { CustomRequest } from "../types/custom";
import { UserService } from "../services/UserService";
import { STATUS_CODE } from "../constants/statusCode";
import { userCreatedSchema } from "../types/validations/User/createUser";
import { userUpdatedSchema } from "../types/validations/User/updateUser";
import { loginUserSchema } from "../types/validations/User/loginUser";
import { querySchema } from "../types/validations/Queries/queryListAll";
import { z } from "zod";

const updateUserPasswordSchema = z.object({
  oldPassword: z.string().min(6),
  newPassword: z.string().min(6),
});

export class UserController {
  private userService = new UserService();

  async getById(req: CustomRequest<unknown>, res: Response) {
    const idUser = req.params.idUser as string;
    const result = await this.userService.getById(idUser);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async listAll(req: CustomRequest<unknown>, res: Response) {
    const validQuery = querySchema.parse(req.query);
    const result = await this.userService.listAll(validQuery);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async register(req: CustomRequest<unknown>, res: Response) {
    const validData = userCreatedSchema.parse(req.body);
    const result = await this.userService.register(validData);
    return res.status(STATUS_CODE.CREATED).json(result);
  }

  async login(req: CustomRequest<unknown>, res: Response) {
    const validData = loginUserSchema.parse(req.body);
    const result = await this.userService.login(validData);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async update(req: CustomRequest<unknown>, res: Response) {
    const idUser = req.params.idUser as string;
    const validData = userUpdatedSchema.parse(req.body);
    const result = await this.userService.update(idUser, validData);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async updatePassword(req: CustomRequest<unknown>, res: Response) {
    const idUser = req.params.idUser as string;
    const validData = updateUserPasswordSchema.parse(req.body);
    const result = await this.userService.updatePassword(idUser, validData);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async delete(req: CustomRequest<unknown>, res: Response) {
    const idUser = req.params.idUser as string;
    const result = await this.userService.delete(idUser);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async refreshToken(req: CustomRequest<unknown>, res: Response) {
    const idUser = req.params.idUser as string;
    const result = await this.userService.refreshToken(idUser);
    return res.status(STATUS_CODE.OK).json(result);
  }
}
