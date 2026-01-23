import { user, vM } from "@prisma/client";
import { VMModel } from "../models/VMModel";
import { TVMCreate, vMCreatedSchema } from "../types/validations/VM/createVM";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { TVMUpdate, vMUpdatedSchema } from "../types/validations/VM/updateVM";
import { vmListAllSchema } from "../types/validations/VM/vmListAll";

export class VMService {
  constructor() { }

  private vMModel = new VMModel();

  async getById(idVM: number) {
    return this.vMModel.getById(idVM);
  }

  async listAll(query: any, user: user) {
    try {
      const validQuery = vmListAllSchema.parse(query);

      const isRequestingOnlyMyBrand = query.onlyMyBrand === 'true';

      if (isRequestingOnlyMyBrand) {
        if (!user.idBrandMaster && user.role !== "admin") {
          return { totalCount: 0, result: [] };
        }
        if (user.role !== "admin") {
          validQuery.idBrandMaster = user.idBrandMaster;
        }
      }

      return await this.vMModel.listAll({ query: validQuery });
    } catch (error) {
      throw error;
    }
  }

  async createNewVM(data: unknown, user: user) {
    const validateData = vMCreatedSchema.parse(data);

    const createdVM = await this.vMModel.createNewVM({
      ...validateData,
      status: "RUNNING",
      idBrandMaster: validateData.idBrandMaster || user.idBrandMaster,
    });

    return createdVM;
  }

  async updateVM(idVM: number, data: unknown, user: user) {
    const validateDataSchema = vMUpdatedSchema.parse(data);
    const oldVM = await this.getById(idVM);

    if (!oldVM) {
      throw new AppError(ERROR_MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const updatedVM = await this.vMModel.updateVM(idVM, validateDataSchema);
    return updatedVM;
  }

  async deleteVM(idVM: number, user: user) {
    if (user.role !== "admin") {
      throw new AppError("Apenas administradores podem excluir VMs.", STATUS_CODE.FORBIDDEN);
    }

    const oldVM = await this.getById(idVM);
    if (!oldVM) {
      throw new AppError(ERROR_MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    const deletedVm = await this.vMModel.deleteVM(idVM);
    return deletedVm;
  }

  async changeStatus(idVM: number, status: "RUNNING" | "STOPPED", user: user) {
    const vm = await this.getById(idVM);
    if (!vm) throw new AppError(ERROR_MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND);

    if (vm.idBrandMaster !== user.idBrandMaster) {
      throw new AppError("Não autorizado", STATUS_CODE.FORBIDDEN);
    }

    return await this.vMModel.updateStatus(idVM, status);
  }
}
