import { prisma } from "../database/client";
import { TUserCreated } from "../types/validations/User/createUser";
import { TQuery } from "../types/validations/Queries/queryListAll";

export class UserModel {
  async getById(idUser: string) {
    return prisma.user.findUnique({
      where: { idUser },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findFirst({
      where: { email, deletedAt: null },
    });
  }

  async totalCount(query: TQuery, isIncludeDeleted?: boolean) {
    return prisma.user.count({
      where: {
        ...(!isIncludeDeleted && { deletedAt: null }),
        username: {
          contains: query.search,
        },
      },
    });
  }

  async listAll(query: TQuery, isIncludeDeleted?: boolean) {
    const limit = query.limit || 0;
    const skip = query.page ? query.page * limit : query.offset || 0;
    const orderBy =
      query.orderBy?.map(({ field, direction }) => ({
        [field]: direction,
      })) || [];

    const users = await prisma.user.findMany({
      where: {
        ...(!isIncludeDeleted && { deletedAt: null }),
        username: {
          contains: query.search,
        },
      },
      take: limit || undefined,
      skip,
      ...(orderBy.length ? { orderBy } : { orderBy: [{ updatedAt: "desc" }] }),
    });

    const totalCount = await this.totalCount(query, isIncludeDeleted);
    return { totalCount, result: users };
  }

  async createNewUser(data: TUserCreated) {
    return prisma.user.create({ data });
  }

  async updateUser(idUser: string, data: TUserCreated) {
    return prisma.user.update({
      where: { idUser },
      data: { ...data, updatedAt: new Date() },
    });
  }

  async deleteUser(idUser: string) {
    return prisma.user.update({
      where: { idUser },
      data: { updatedAt: new Date(), deletedAt: new Date() },
    });
  }
}
