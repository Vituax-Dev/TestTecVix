import { Response } from "express";
import { CustomRequest } from "../types/custom";
import { BrandMasterService } from "../services/BrandMasterService";
import { user } from "@prisma/client";
import { STATUS_CODE } from "../constants/statusCode";

export class BrandMasterController {
  constructor() {}
  private brandMasterService = new BrandMasterService();

  async getSelf(req: CustomRequest<unknown>, res: Response) {
    return res.status(STATUS_CODE.OK).json(null);
  }

  async getById(req: CustomRequest<unknown>, res: Response) {
    const { idBrandMaster } = req.params;
    const result = await this.brandMasterService.getById(Number(idBrandMaster));
    return res.status(STATUS_CODE.OK).json({ brandMaster: result });
  }

  async listAll(req: CustomRequest<unknown>, res: Response) {
    const result = await this.brandMasterService.listAll(req.query);
    return res.status(STATUS_CODE.OK).json(result);
  }

  /**
   * Cria um novo MSP com admin obrigatório em transação
   * Se o admin falhar, o MSP não é criado (rollback automático)
   */
  async createNewBrandMaster(req: CustomRequest<unknown>, res: Response) {
    const result = await this.brandMasterService.createNewBrandMaster(req.body);
    return res.status(STATUS_CODE.CREATED).json(result);
  }

  async updateBrandMaster(req: CustomRequest<unknown>, res: Response) {
    const user = req.user as user;
    const { idBrandMaster } = req.params;
    const result = await this.brandMasterService.updateBrandMaster(
      Number(idBrandMaster),
      req.body,
      user,
    );
    return res.status(STATUS_CODE.OK).json(result);
  }

  async deleteBrandMaster(req: CustomRequest<unknown>, res: Response) {
    const user = req.user as user;
    const { idBrandMaster } = req.params;
    const result = await this.brandMasterService.deleteBrandMaster(
      Number(idBrandMaster),
      user,
    );
    return res.status(STATUS_CODE.OK).json(result);
  }
}
