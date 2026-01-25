import { prisma } from "../database/client";
import { TQuery } from "../types/validations/Queries/queryListAll";
import {
  TCreateUser,
  TUpdateUser,
} from "../types/validations/User/userValidation";

export class UserModel {
  async getById(idUser: string) {
    return prisma.user.findUnique({
      where: { idUser, deletedAt: null },
      include: { brandMaster: true },
    });
  }

  async getByEmail(email: string) {
    return prisma.user.findFirst({
      where: { email, deletedAt: null, isActive: true },
      include: { brandMaster: true },
    });
  }

  async listAll(query: TQuery, isIncludeDeleted?: boolean) {
    const limit = query.limit || 0;
    const skip = query.page ? query.page * limit : query.offset || 0;
    const orderBy =
      query.orderBy?.map(({ field, direction }) => ({ [field]: direction })) ||
      [];
    const users = await prisma.user.findMany({
      where: {
        ...(!isIncludeDeleted && { deletedAt: null }),
        OR: [
          { username: { contains: query.search } },
          { email: { contains: query.search } },
        ],
      },
      include: {
        brandMaster: {
          select: {
            idBrandMaster: true,
            brandName: true,
          },
        },
      },
      take: limit || undefined,
      skip,
      ...(orderBy.length ? { orderBy } : { orderBy: [{ updatedAt: "desc" }] }),
    });
    const totalCount = await this.totalCount(query, isIncludeDeleted);
    return { totalCount, result: users };
  }

  async totalCount(query: TQuery, isIncludeDeleted?: boolean) {
    return prisma.user.count({
      where: {
        ...(!isIncludeDeleted && { deletedAt: null }),
        OR: [
          { username: { contains: query.search } },
          { email: { contains: query.search } },
        ],
      },
    });
  }

  async createUser(data: TCreateUser) {
    return prisma.user.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      include: { brandMaster: true },
    });
  }

  async updateUser(idUser: string, data: TUpdateUser) {
    return prisma.user.update({
      where: { idUser },
      data: {
        ...data,
        updatedAt: new Date(),
      },
      include: { brandMaster: true },
    });
  }

  async deleteUser(idUser: string) {
    return prisma.user.update({
      where: { idUser },
      data: {
        updatedAt: new Date(),
        deletedAt: new Date(),
      },
    });
  }

  async emailExists(email: string, excludeUserId?: string) {
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        deletedAt: null,
        ...(excludeUserId && { idUser: { not: excludeUserId } }),
      },
    });
    return !!existingUser;
  }

  async updateLastLogin(idUser: string) {
    return prisma.user.update({
      where: { idUser },
      data: {
        lastLoginDate: new Date(),
        updatedAt: new Date(),
      },
    });
  }
}
