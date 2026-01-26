import { Response } from "express";
import { CustomRequest } from "../types/custom";
import { VMService } from "../services/VMService";
import { STATUS_CODE } from "../constants/statusCode";
import { user } from "@prisma/client";
import { idVMParamsSchema } from "../types/validations/VM/createVM";

export class VMController {
  constructor() {}
  private vMService = new VMService();

  async getById(req: CustomRequest<unknown>, res: Response) {
    const { idVM } = idVMParamsSchema.parse(req.params);
    const user = req.user as user;
    const result = await this.vMService.getById(idVM, user.idBrandMaster);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async listAll(req: CustomRequest<unknown>, res: Response) {
    const user = req.user as user;
    const result = await this.vMService.listAll(req.query, user);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async createVM(req: CustomRequest<unknown>, res: Response) {
    const user = req.user as user;
    const result = await this.vMService.createNewVM(req.body, user);
    return res.status(STATUS_CODE.CREATED).json(result);
  }

  async updateVM(req: CustomRequest<unknown>, res: Response) {
    const { idVM } = idVMParamsSchema.parse(req.params);
    const user = req.user as user;
    await this.vMService.updateVM(idVM, req.body, user);
    return res.status(STATUS_CODE.NO_CONTENT).send();
  }

  async deleteVM(req: CustomRequest<unknown>, res: Response) {
    const { idVM } = idVMParamsSchema.parse(req.params);
    const user = req.user as user;
    await this.vMService.deleteVM(idVM, user);
    return res.status(STATUS_CODE.NO_CONTENT).send();
  }
}
