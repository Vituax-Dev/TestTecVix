import { prisma } from "../database/client";
import { Prisma } from "@prisma/client";

export class UserModel {
  async findByEmail(email: string) {
    return prisma.user.findFirst({
      where: { email, deletedAt: null },
    });
  }

  async findById(idUser: string) {
    return prisma.user.findFirst({
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

  async hardDelete(idUser: string) {
    return prisma.user.delete({
      where: { idUser },
    });
  }

  async listAll(query: { page?: number; limit?: number; search?: string; idBrandMaster?: number }) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.userWhereInput = {
      deletedAt: null,
      ...(query.search && {
        OR: [
          { username: { contains: query.search } },
          { email: { contains: query.search } },
          { fullName: { contains: query.search } },
        ],
      }),
      ...(query.idBrandMaster !== undefined && {
        idBrandMaster: query.idBrandMaster === 0 ? null : query.idBrandMaster,
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
          phone: true,
          role: true,
          isActive: true,
          profileImgUrl: true,
          idBrandMaster: true,
          fullName: true,
          position: true,
          department: true,
          hiringDate: true,
          lastLoginDate: true,
          brandMaster: {
            select: {
              idBrandMaster: true,
              brandName: true,
            },
          },
          createdAt: true,
        },
      }),
      prisma.user.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }
}
