import { prisma } from "../database/client";
import { TUserCreate } from "../types/validations/User/createUser";

export class UserModel {
  async createUser(data: TUserCreate) {
    return await prisma.user.create({
      data: { ...data },
      select: {
        idUser: true,
        username: true,
        email: true,
        profileImgUrl: true,
        role: true,
        idBrandMaster: true,
        isActive: true,
        lastLoginDate: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
  }
}
