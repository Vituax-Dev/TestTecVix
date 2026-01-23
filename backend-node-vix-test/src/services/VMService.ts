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

      // Identifica se o checkbox "Apenas minhas VMs" foi marcado no Frontend
      const isRequestingOnlyMyBrand = query.onlyMyBrand === 'true';

      if (isRequestingOnlyMyBrand) {
        // Se o usuário quer apenas as dele, mas NÃO tem empresa vinculada
        if (!user.idBrandMaster && user.role !== "admin") {
          // Retornamos lista vazia imediatamente sem consultar o banco
          return { totalCount: 0, result: [] };
        }

        // Se ele tem empresa, aplicamos o filtro normalmente
        if (user.role !== "admin") {
          validQuery.idBrandMaster = user.idBrandMaster;
        }
      }

      // Se o checkbox estiver desmarcado (isRequestingOnlyMyBrand === false), 
      // validQuery.idBrandMaster continuará undefined e o Prisma retornará todas as VMs.
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
}
