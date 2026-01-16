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
import {
  TUserUpdated,
  userUpdatedSchema,
} from "../types/validations/User/updateUser";

import bcryptjs from "bcryptjs";

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

    const hashedPassword = await bcryptjs.hash(validData.password, 10);

    const newUser = await this.userModel.createNewUser({
      ...validData,
      password: hashedPassword,
    });
    return newUser;
  }

  private async update({
    validData,
    idUser,
    oldUser,
  }: {
    user: user;
    validData: TUserUpdated;
    idUser: string;
    oldUser: user;
  }) {
    const dataToUpdate: any = { ...validData };

    if (validData.password) {
      if (!validData.currentPassword) {
        throw new AppError(
          "Current password is required to change password",
          STATUS_CODE.BAD_REQUEST
        );
      }

      const isPasswordValid = await bcryptjs.compare(
        validData.currentPassword,
        oldUser.password
      );

      if (!isPasswordValid) {
        throw new AppError(
          "Current password is incorrect",
          STATUS_CODE.UNAUTHORIZED
        );
      }

      dataToUpdate.password = await bcryptjs.hash(validData.password, 10);
    }

    delete dataToUpdate.currentPassword;

    return await this.userModel.updateUser(idUser, dataToUpdate);
  }

  async updateUser(idUser: string, data: unknown, user: user) {
    const validData = userUpdatedSchema.parse(data);
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
