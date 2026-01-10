import { user } from "@prisma/client";
import { UserModel } from "../models/UserModel";
import { querySchema } from "../types/validations/Queries/queryListAll";
import {
  userCreatedSchema,
  TUserCreated,
} from "../types/validations/User/createUser";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";

export class UserService {
  constructor() {}
  private userModel = new UserModel();

  async getById(idUser: string) {
    return this.userModel.getById(idUser);
  }

  async listAll(query: unknown) {
    const validQuery = querySchema.parse(query);
    return this.userModel.listAll(validQuery);
  }

  async createNewUser(data: TUserCreated) {
    const validData = userCreatedSchema.parse(data);
    const newUser = await this.userModel.createNewUser(validData);
    return newUser;
  }

  private async update({
    validData,
    idUser,
  }: {
    user: user;
    validData: TUserCreated;
    idUser: string;
    oldUser: user;
  }) {
    return await this.userModel.updateUser(idUser, validData);
  }

  async updateUser(idUser: string, data: unknown, user: user) {
    const validData = userCreatedSchema.parse(data);
    const oldUser = await this.userModel.getById(idUser);
    if (!oldUser) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    return this.update({
      user,
      validData,
      idUser,
      oldUser,
    });
  }

  async deleteUser(idUser: string) {
    const oldUser = await this.userModel.getById(idUser);
    if (!oldUser) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const deletedUser = await this.userModel.deleteUser(idUser);

    return {
      user: deletedUser,
    };
  }
}
