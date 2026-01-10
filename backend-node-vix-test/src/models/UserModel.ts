import { prisma } from "../database/client";
import { TUserCreated } from "../types/validations/User/createUser";
import { TUserUpdated } from "../types/validations/User/updateUser";

export class UserModel {
  async getById(idUser: string) {
    return await prisma.user.findUnique({
      where: { idUser },
    });
  }

  async createNewUser(data: TUserCreated) {
    return await prisma.user.create({
      data: { ...data },
    });
  }

  async updateUser(idUser: string, data: TUserUpdated) {
    return await prisma.user.update({
      where: { idUser },
      data: { ...data, updatedAt: new Date() },
    });
  }

  async deleteUser(idUser: string) {
    return await prisma.user.update({
      where: { idUser },
      data: { updatedAt: new Date(), deletedAt: new Date() },
    });
  }
}
