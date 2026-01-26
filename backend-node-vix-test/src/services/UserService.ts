import bcrypt from "bcryptjs";
import { user } from "@prisma/client";
import { UserModel } from "../models/UserModel";
import { userCreatedSchema } from "../types/validations/User/createUser";
import { userUpdatedSchema } from "../types/validations/User/updateUser";
import { updateMeSchema } from "../types/validations/User/updateMe";
import { userListAllSchema } from "../types/validations/User/userListAll";
import { ERole } from "@prisma/client";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";

export class UserService {
  constructor() {}

  private userModel = new UserModel();

  async getById(idUser: string, idBrandMaster: number | null) {
    const foundUser = await this.userModel.getById(idUser, idBrandMaster);
    if (!foundUser) {
      throw new AppError(ERROR_MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    return foundUser;
  }

  async listAll(query: unknown, user: user) {
    const validQuery = userListAllSchema.parse(query);

    const idBrandMaster =
      user.idBrandMaster === null
        ? validQuery.idBrandMaster
        : user.idBrandMaster;

    return this.userModel.listAll({
      query: validQuery,
      idBrandMaster,
    });
  }

  async register(data: unknown) {
    const validateData = userCreatedSchema.parse(data);

    const hashedPassword = await bcrypt.hash(validateData.password, 10);

    const createdUser = await this.userModel.createUser({
      ...validateData,
      password: hashedPassword,
      role: ERole.member,
      idBrandMaster: null,
    });

    return createdUser;
  }

  async createUser(data: unknown, currentUser: user) {
    const validateData = userCreatedSchema.parse(data);

    const hashedPassword = await bcrypt.hash(validateData.password, 10);

    // Determina o idBrandMaster: usa o do request ou herda do currentUser
    const idBrandMaster = validateData.idBrandMaster ?? currentUser.idBrandMaster;

    const createdUser = await this.userModel.createUser({
      ...validateData,
      password: hashedPassword,
      idBrandMaster,
      isActive: validateData.isActive ?? false,
    });

    return createdUser;
  }

  async updateMe(idUser: string, data: unknown) {
    const dataToUpdate = updateMeSchema.parse(data);

    if (dataToUpdate.password) {
      dataToUpdate.password = await bcrypt.hash(dataToUpdate.password, 10);
    }

    return await this.userModel.updateUser(idUser, dataToUpdate);
  }

  async updateUser(idUser: string, data: unknown, currentUser: user) {
    const dataToUpdate = userUpdatedSchema.parse(data);

    // Verifica se o usuário existe e se o currentUser tem acesso
    await this.getById(idUser, currentUser.idBrandMaster);

    if (dataToUpdate.password) {
      dataToUpdate.password = await bcrypt.hash(dataToUpdate.password, 10);
    }

    return await this.userModel.updateUser(idUser, dataToUpdate);
  }

  async deleteUser(idUser: string, currentUser: user) {
    // Verifica se o usuário existe e se o currentUser tem acesso
    await this.getById(idUser, currentUser.idBrandMaster);

    await this.userModel.deleteUser(idUser);
  }
}
