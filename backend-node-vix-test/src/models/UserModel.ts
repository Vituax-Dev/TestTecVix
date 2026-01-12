import { prisma } from "../database/client";
import { TUserCreated } from "../types/validations/User/createUser";
import { TUserUpdated } from "../types/validations/User/updateUser";
import { TQuery } from "../types/validations/Queries/queryListAll";

export class UserModel {
  async getById(idUser: string) {
    return prisma.user.findUnique({
      where: { idUser },
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
      },
    });
  }

  async getByEmail(email: string) {
    return prisma.user.findFirst({
      where: { email, deletedAt: null },
    });
  }

  async getByUsername(username: string) {
    return prisma.user.findFirst({
      where: { username, deletedAt: null },
    });
  }

  async totalCount(query: TQuery) {
    return prisma.user.count({
      where: {
        deletedAt: null,
        username: { contains: query.search },
      },
    });
  }

  async listAll(query: TQuery) {
    const limit = query.limit || 0;
    const skip = query.page ? query.page * limit : query.offset || 0;
    const orderBy =
      query.orderBy?.map(({ field, direction }) => ({
        [field]: direction,
      })) || [];

    const users = await prisma.user.findMany({
      where: {
        deletedAt: null,
        username: { contains: query.search },
      },
      take: limit || undefined,
      skip,
      orderBy: orderBy.length ? orderBy : [{ createdAt: "desc" }],
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
      },
    });

    const totalCount = await this.totalCount(query);
    return { totalCount, result: users };
  }

  async create(data: TUserCreated) {
    return prisma.user.create({
      data,
      select: {
        idUser: true,
        username: true,
        email: true,
        profileImgUrl: true,
        role: true,
        idBrandMaster: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(idUser: string, data: TUserUpdated) {
    return prisma.user.update({
      where: { idUser },
      data: { ...data, updatedAt: new Date() },
      select: {
        idUser: true,
        username: true,
        email: true,
        profileImgUrl: true,
        role: true,
        idBrandMaster: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updatePassword(idUser: string, hashedPassword: string) {
    return prisma.user.update({
      where: { idUser },
      data: { password: hashedPassword, updatedAt: new Date() },
    });
  }

  async updateLastLogin(idUser: string) {
    return prisma.user.update({
      where: { idUser },
      data: { lastLoginDate: new Date() },
    });
  }

  async delete(idUser: string) {
    return prisma.user.update({
      where: { idUser },
      data: { deletedAt: new Date(), updatedAt: new Date() },
    });
  }
}
