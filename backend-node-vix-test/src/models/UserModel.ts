import { prisma } from "../database/client";
import { Prisma } from "@prisma/client";

export class UserModel {
  async findByEmail(email: string) {
    return prisma.user.findFirst({
      where: { email, deletedAt: null },
    });
  }

  async findById(idUser: string) {
    return prisma.user.findUnique({
      where: { idUser, deletedAt: null },
      include: { brandMaster: true },
    });
  }

  async create(data: Prisma.userCreateInput) {
    return prisma.user.create({ data });
  }

  async update(idUser: string, data: Prisma.userUpdateInput) {
    return prisma.user.update({
      where: { idUser },
      data: { ...data, updatedAt: new Date() },
    });
  }

  async softDelete(idUser: string) {
    return prisma.user.update({
      where: { idUser },
      data: { deletedAt: new Date(), updatedAt: new Date() },
    });
  }

  async listAll(query: { page?: number; limit?: number; search?: string }) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.userWhereInput = {
      deletedAt: null,
      ...(query.search && {
        OR: [
          { username: { contains: query.search } },
          { email: { contains: query.search } },
        ],
      }),
    };

    const [data, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          idUser: true,
          username: true,
          email: true,
          role: true,
          isActive: true,
          profileImgUrl: true,
          idBrandMaster: true,
          brandMaster: true,
          createdAt: true,
        },
      }),
      prisma.user.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }
}
