import { brandMaster, user } from "@prisma/client";
import { BrandMasterModel } from "../models/BrandMasterModel";
import { querySchema } from "../types/validations/Queries/queryListAll";
import {
  brandMasterSchema,
  TBrandMaster,
} from "../types/validations/BrandMaster/createBrandMaster";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";

export class BrandMasterService {
  constructor() {}
  private brandMasterModel = new BrandMasterModel();

  async getSelf(domain: string) {
    return await this.brandMasterModel.getSelf(domain);
  }

  async getById(idBrandMaster: number, userIdBrandMaster: number | null) {
    const brandMaster = await this.brandMasterModel.getById(
      idBrandMaster,
      userIdBrandMaster,
    );
    if (!brandMaster) {
      throw new AppError(
        ERROR_MESSAGE.BRAND_MASTER_NOT_FOUND,
        STATUS_CODE.NOT_FOUND,
      );
    }
    return brandMaster;
  }

  async listAll(query: unknown, user: user) {
    const validQuery = querySchema.parse(query);
    return this.brandMasterModel.listAll(validQuery, user.idBrandMaster);
  }

  async createNewBrandMaster(data: TBrandMaster, user: user) {
    const validData = brandMasterSchema.parse(data);

    if (validData.contract) {
      validData.contractAt = new Date();
    }

    if (validData.isPoc) {
      validData.pocOpenedAt = new Date();
    }

    const newBrandMaster =
      await this.brandMasterModel.createNewBrandMaster(validData);

    return newBrandMaster;
  }

  private async update({
    validData,
    idBrandMaster,
  }: {
    user: user;
    validData: TBrandMaster;
    idBrandMaster: number;
    oldBrandMaster: brandMaster;
  }) {
    return await this.brandMasterModel.updateBrandMaster(
      idBrandMaster,
      validData,
    );
  }

  async updateBrandMaster(idBrandMaster: number, data: unknown, user: user) {
    const oldBrandMaster = await this.getById(
      idBrandMaster,
      user.idBrandMaster,
    );

    if (!oldBrandMaster) {
      throw new AppError(
        ERROR_MESSAGE.BRAND_MASTER_NOT_FOUND,
        STATUS_CODE.NOT_FOUND,
      );
    }

    const validData = brandMasterSchema.parse(data);

    if (
      !oldBrandMaster.contract &&
      validData.contract &&
      !oldBrandMaster.contractAt
    ) {
      validData.contractAt = new Date();
    }

    if (
      validData.isPoc === true &&
      oldBrandMaster.isPoc !== true &&
      !oldBrandMaster.pocOpenedAt
    ) {
      validData.pocOpenedAt = new Date();
    }

    return this.update({
      user,
      validData,
      idBrandMaster,
      oldBrandMaster,
    });
  }

  async deleteBrandMaster(idBrandMaster: number, user: user) {
    const oldBrandMaster = await this.getById(
      idBrandMaster,
      user.idBrandMaster,
    );

    if (!oldBrandMaster) {
      throw new AppError(
        ERROR_MESSAGE.BRAND_MASTER_NOT_FOUND,
        STATUS_CODE.NOT_FOUND,
      );
    }

    const deletedBrand =
      await this.brandMasterModel.deleteBrandMaster(idBrandMaster);

    return {
      brandMaster: deletedBrand,
    };
  }
}
