import { prisma } from "../database/client";
import { TUserCreate } from "../types/validations/User/createUser";

export class UserModel {
  async findByEmail(email: string) {
    return await prisma.user.findFirst({
      where: { email, deletedAt: null },
    });
  }

  async createUser(data: TUserCreate) {
    return await prisma.user.create({
      data: { ...data, isActive: false },
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
