import { prisma } from "../database/client";
import { TUserCreate } from "../types/validations/User/createUser";
import { TUserUpdated } from "../types/validations/User/updateUser";
import { IListAllUser } from "../types/IListAll";
const userSelectFields = {
  idUser: true,
  username: true,
  email: true,
  fullName: true,
  phone: true,
  profileImgUrl: true,
  position: true,
  department: true,
  role: true,
  idBrandMaster: true,
  isActive: true,
  lastLoginDate: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  brandMaster: {
    select: {
      brandName: true,
      brandLogo: true,
    },
  },
};

export class UserModel {
  async findByEmail(email: string) {
    return await prisma.user.findFirst({
      where: { email, deletedAt: null },
    });
  }

  async getById(idUser: string, idBrandMaster?: number | null) {
    return await prisma.user.findFirst({
      where: {
        idUser,
        deletedAt: null,
        idBrandMaster: idBrandMaster ?? undefined,
      },
      select: userSelectFields,
    });
  }

  async totalCount({ query, idBrandMaster }: IListAllUser) {
    return prisma.user.count({
      where: {
        deletedAt: null,
        idBrandMaster: idBrandMaster ?? undefined,
        isActive: query.isActive,
        OR: query.search
          ? [
              { username: { contains: query.search } },
              { email: { contains: query.search } },
            ]
          : undefined,
      },
    });
  }

  async listAll({ query, idBrandMaster }: IListAllUser) {
    const limit = query.limit || 0;
    const skip = query.page ? query.page * limit : query.offset || 0;
    const orderBy =
      query.orderBy?.map(({ field, direction }) => ({
        [field]: direction,
      })) || [];

    const whereClause = {
      deletedAt: null,
      idBrandMaster: idBrandMaster ?? undefined,
      isActive: query.isActive,
      OR: query.search
        ? [
            { username: { contains: query.search } },
            { email: { contains: query.search } },
          ]
        : undefined,
    };

    const [users, totalCount] = await prisma.$transaction([
      prisma.user.findMany({
        where: whereClause,
        skip,
        take: limit || undefined,
        orderBy: orderBy.length ? orderBy : { updatedAt: "desc" },
        select: userSelectFields,
      }),
      prisma.user.count({ where: whereClause }),
    ]);

    return { totalCount, result: users };
  }

  async createUser(data: TUserCreate & { isActive?: boolean }) {
    return await prisma.user.create({
      data: { ...data, isActive: data.isActive ?? false },
      select: userSelectFields,
    });
  }

  async updateUser(idUser: string, data: TUserUpdated) {
    return await prisma.user.update({
      where: { idUser },
      data: { ...data, updatedAt: new Date() },
      select: userSelectFields,
    });
  }

  async deleteUser(idUser: string) {
    return await prisma.user.update({
      where: { idUser },
      data: { updatedAt: new Date(), deletedAt: new Date() },
      select: userSelectFields,
    });
  }
}
