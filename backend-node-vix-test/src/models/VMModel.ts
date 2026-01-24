import { prisma } from "../database/client";
import { TVMCreate } from "../types/validations/VM/createVM";
import { TVMUpdate } from "../types/validations/VM/updateVM";
import { IListAllVM } from "../types/IListAll";
import moment from "moment";

export class VMModel {
  async getById(idVM: number) {
    return await prisma.vM.findUnique({
      where: { idVM },
    });
  }

  async totalCount({ query, idBrandMaster }: IListAllVM) {
    const { status, idBrandMaster: idBrandMasterParams } = query;
    const isRetriveAllCompanies = idBrandMaster === idBrandMasterParams;

    return prisma.vM.count({
      where: {
        deletedAt: null,
        idBrandMaster:
          !idBrandMaster && isRetriveAllCompanies ? undefined : idBrandMaster,
        status,
        vmName: {
          contains: query.search,
        },
      },
    });
  }

  async listAll({ query }: IListAllVM) {
    const limit = Number(query.limit) || 0;
    const skip = query.page ? Number(query.page) * limit : Number(query.offset) || 0;

    const idBrandMaster = query.idBrandMaster ? Number(query.idBrandMaster) : undefined;
    const status = query.status;

    const orderBy =
      query.orderBy?.map(({ field, direction }) => ({
        [field]: direction,
      })) || [];

    const vms = await prisma.vM.findMany({
      where: {
        deletedAt: null,
        idBrandMaster: idBrandMaster,
        status,
        vmName: {
          contains: query.search,
        },
      },
      skip,
      take: limit || undefined,
      orderBy: orderBy.length
        ? orderBy
        : {
          updatedAt: "desc",
        },
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

  async createNewVM(data: any) {
    return await prisma.vM.create({
    data: {
      vmName: data.vmName,
      vCPU: data.vCPU,
      ram: data.ram,
      disk: data.disk,
      hasBackup: data.hasBackup,
      pass: data.pass,
      location: data.location, 
      os: data.os,
      idBrandMaster: data.idBrandMaster,
      status: "RUNNING",
    },
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

  async updateStatus(idVM: number, status: "RUNNING" | "STOPPED" | "PAUSED") {
    return await prisma.vM.update({
      where: { idVM },
      data: {
        status: status, 
        updatedAt: new Date()
      },
    });
  }
}
