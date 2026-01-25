import { Response } from "express";
import { CustomRequest } from "../types/custom";
import { BrandMasterService } from "../services/BrandMasterService";
import { user } from "@prisma/client";
import { STATUS_CODE } from "../constants/statusCode";
import { idBrandMasterParamsSchema } from "../types/validations/BrandMaster/createBrandMaster";

export class BrandMasterController {
  constructor() {}
  private brandMasterService = new BrandMasterService();

  async getSelf(req: CustomRequest<unknown>, res: Response) {
    return res.status(STATUS_CODE.OK).json(null);
  }

  async getById(req: CustomRequest<unknown>, res: Response) {
    const { idBrandMaster } = idBrandMasterParamsSchema.parse(req.params);
    const user = req.user as user;
    const result = await this.brandMasterService.getById(
      idBrandMaster,
      user.idBrandMaster,
    );
    return res.status(STATUS_CODE.OK).json(result);
  }

  async listAll(req: CustomRequest<unknown>, res: Response) {
    const user = req.user as user;
    const result = await this.brandMasterService.listAll(req.query, user);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async createNewBrandMaster(req: CustomRequest<unknown>, res: Response) {
    const user = req.user as user;
    const result = await this.brandMasterService.createNewBrandMaster(
      req.body,
      user,
    );
    return res.status(STATUS_CODE.CREATED).json(result);
  }

  async updateBrandMaster(req: CustomRequest<unknown>, res: Response) {
    const user = req.user as user;
    const { idBrandMaster } = idBrandMasterParamsSchema.parse(req.params);
    const result = await this.brandMasterService.updateBrandMaster(
      idBrandMaster,
      req.body,
      user,
    );
    return res.status(STATUS_CODE.OK).json(result);
  }

  async deleteBrandMaster(req: CustomRequest<unknown>, res: Response) {
    const user = req.user as user;
    const { idBrandMaster } = idBrandMasterParamsSchema.parse(req.params);
    const result = await this.brandMasterService.deleteBrandMaster(
      idBrandMaster,
      user,
    );
    return res.status(STATUS_CODE.OK).json(result);
  }
}
