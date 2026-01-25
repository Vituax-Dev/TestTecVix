import { user, vM } from "@prisma/client";
import { VMModel } from "../models/VMModel";
import { TVMCreate, vMCreatedSchema } from "../types/validations/VM/createVM";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { TVMUpdate, vMUpdatedSchema } from "../types/validations/VM/updateVM";
import { vmListAllSchema } from "../types/validations/VM/vmListAll";

export class VMService {
  constructor() {}

  private vMModel = new VMModel();

  /**
   * Helper to check if user can manage a specific VM
   * - Vituax users (idBrandMaster: null) can manage any VM
   * - MSP users can only manage VMs from their own company
   * - Members cannot manage any VM
   */
  private canUserManageVM(user: user, vm: vM): boolean {
    // Members cannot manage VMs
    if (user.role === "member") return false;

    // Vituax users can manage any VM
    if (user.idBrandMaster === null) return true;

    // MSP users can only manage their own company's VMs
    return vm.idBrandMaster === user.idBrandMaster;
  }

  /**
   * Helper to check if user can delete a VM (admin only)
   */
  private canUserDeleteVM(user: user, vm: vM): boolean {
    // Only admins can delete
    if (user.role !== "admin") return false;

    // Vituax admin can delete any VM
    if (user.idBrandMaster === null) return true;

    // MSP admin can only delete their own company's VMs
    return vm.idBrandMaster === user.idBrandMaster;
  }

  async getById(idVM: number) {
    return this.vMModel.getById(idVM);
  }

  async listAll(query: unknown, user: user) {
    const validQuery = vmListAllSchema.parse(query);

    // Determine idBrandMaster filter based on user and request
    // If showAll=true (used in Home), show all VMs regardless of company
    // Otherwise, filter by user's company (for MyVMs page)
    let idBrandMaster: number | undefined;

    const showAll = validQuery.showAll === true;

    if (!showAll && user.idBrandMaster !== null) {
      // MSP user without showAll - force filter by their company
      idBrandMaster = user.idBrandMaster;
    } else if (validQuery.idBrandMaster != null) {
      // Explicit filter requested (by Vituax or with showAll)
      idBrandMaster = Number(validQuery.idBrandMaster);
    }

    return this.vMModel.listAll({
      query: validQuery,
      idBrandMaster,
    });
  }

  async createNewVM(data: unknown, user: user) {
    // Only admin/manager can create VMs
    if (user.role === "member") {
      throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
    }

    const validateData = vMCreatedSchema.parse(data);

    const createdVM = await this.vMModel.createNewVM({
      ...validateData,
      status: "RUNNING",
    });

    return createdVM;
  }

  async updateVM(idVM: number, data: unknown, user: user) {
    const validateDataSchema = vMUpdatedSchema.parse(data);
    const oldVM = await this.getById(idVM);

    if (!oldVM) {
      throw new AppError(ERROR_MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    // Check if user can manage this VM
    if (!this.canUserManageVM(user, oldVM)) {
      throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
    }

    const updatedVM = await this.vMModel.updateVM(idVM, validateDataSchema);
    return updatedVM;
  }

  async deleteVM(idVM: number, user: user) {
    const oldVM = await this.getById(idVM);
    if (!oldVM) {
      throw new AppError(ERROR_MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    // Check if user can delete this VM (admin only)
    if (!this.canUserDeleteVM(user, oldVM)) {
      throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
    }

    const deletedVm = await this.vMModel.deleteVM(idVM);
    return deletedVm;
  }
}
