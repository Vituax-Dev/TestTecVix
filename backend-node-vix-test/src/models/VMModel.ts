import { prisma } from "../database/client";
import { TVMCreate } from "../types/validations/VM/createVM";
import { TVMUpdate } from "../types/validations/VM/updateVM";
import { IListAllVM } from "../types/IListAll";
import moment from "moment";

export class VMModel {
  async getById(idVM: number, idBrandMaster?: number | null) {
    return prisma.vM.findFirst({
      where: {
        idVM,
        idBrandMaster: idBrandMaster ?? undefined,
      },
    });
  }

  async totalCount({ query, idBrandMaster }: IListAllVM) {
    return prisma.vM.count({
      where: {
        deletedAt: null,
        idBrandMaster: idBrandMaster ?? undefined,
        status: query.status,
        vmName: {
          contains: query.search,
        },
      },
    });
  }

  async listAll({ query, idBrandMaster }: IListAllVM) {
    const limit = query.limit || 0;
    const skip = query.page ? query.page * limit : query.offset || 0;
    const orderBy =
      query.orderBy?.map(({ field, direction }) => ({
        [field]: direction,
      })) || [];

    const vms = await prisma.vM.findMany({
      where: {
        deletedAt: null,
        idBrandMaster: idBrandMaster ?? undefined,
        status: query.status,
        vmName: {
          contains: query.search,
        },
      },
      skip,
      take: limit || undefined,
      orderBy: orderBy.length ? orderBy : { updatedAt: "desc" },
      include: {
        brandMaster: {
          select: {
            brandName: true,
            brandLogo: true,
          },
        },
      },
    });

    const totalCount = await this.totalCount({
      query,
      idBrandMaster,
    });
    return { totalCount, result: vms };
  }

  async createNewVM(data: TVMCreate) {
    return await prisma.vM.create({
      data: { ...data },
    });
  }

  async updateVM(idVM: number, data: TVMUpdate) {
    return await prisma.vM.update({
      where: { idVM },
      data: { ...data, updatedAt: new Date() },
    });
  }

  async deleteVM(idVM: number) {
    return await prisma.vM.update({
      where: { idVM },
      data: { updatedAt: new Date(), deletedAt: new Date() },
    });
  }
}
