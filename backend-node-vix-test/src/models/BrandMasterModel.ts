import { prisma } from "../database/client";
import { TBrandMaster, TUpdateBrandMaster } from "../types/validations/BrandMaster/createBrandMaster";
import { TQuery } from "../types/validations/Queries/queryListAll";
import moment from "moment";

export class BrandMasterModel {
  async getSelf(domain: string) {
    return prisma.brandMaster.findFirst({
      where: {
        domain: {
          contains: domain,
        },
        deletedAt: null,
      },
      select: {
        idBrandMaster: true,
        brandName: true,
        brandLogo: true,
        domain: true,
        setorName: true,
        fieldName: true,
        location: true,
        city: true,
        emailContact: true,
        smsContact: true,
        timezone: true,
        manual: true,
        termsOfUse: true,
        privacyPolicy: true,
      },
    });
  }

  async getById(idBrandMaster: number, userIdBrandMaster?: number | null) {
    // Se o usuário pertence a um BrandMaster, só pode ver o seu próprio
    if (userIdBrandMaster && userIdBrandMaster !== idBrandMaster) {
      return null;
    }
    
    return prisma.brandMaster.findFirst({
      where: {
        idBrandMaster,
        deletedAt: null,
      },
    });
  }

  async totalCount(
    query: TQuery,
    idBrandMaster?: number | null,
    isIncludeDeleted?: boolean,
  ) {
    return prisma.brandMaster.count({
      where: {
        deletedAt: isIncludeDeleted ? undefined : null,
        idBrandMaster: idBrandMaster ?? undefined,
        isPoc: query.isPoc,
        brandName: {
          contains: query.search,
        },
      },
    });
  }

  async listAll(
    query: TQuery,
    idBrandMaster?: number | null,
    isIncludeDeleted?: boolean,
  ) {
    const limit = query.limit || 0;
    const skip = query.page ? query.page * limit : query.offset || 0;
    const orderBy =
      query.orderBy?.map(({ field, direction }) => ({
        [field]: direction,
      })) || [];

    const brands = await prisma.brandMaster.findMany({
      where: {
        deletedAt: isIncludeDeleted ? undefined : null,
        idBrandMaster: idBrandMaster ?? undefined,
        isPoc: query.isPoc,
        brandName: {
          contains: query.search,
        },
      },
      include: {
        users: {
          where: {
            role: "admin",
            deletedAt: null,
          },
          take: 1,
          select: {
            idUser: true,
            username: true,
            email: true,
            role: true,
          },
        },
      },
      take: limit || undefined,
      skip,
      orderBy: orderBy.length ? orderBy : [{ updatedAt: "desc" }],
    });

    const totalCount = await this.totalCount(
      query,
      idBrandMaster,
      isIncludeDeleted,
    );
    return { totalCount, result: brands };
  }

  async createNewBrandMaster(data: TBrandMaster) {
    return prisma.brandMaster.create({ data });
  }

  async updateBrandMaster(idBrandMaster: number, data: TUpdateBrandMaster) {
    return prisma.brandMaster.update({
      where: { idBrandMaster },
      data: { ...data, updatedAt: new Date() },
    });
  }

  async deleteBrandMaster(idBrandMaster: number) {
    return prisma.brandMaster.update({
      where: { idBrandMaster },
      data: { updatedAt: new Date(), deletedAt: new Date() },
    });
  }
}
