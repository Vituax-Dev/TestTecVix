import { brandMaster, user, ERole } from "@prisma/client";
import bcrypt from "bcryptjs";
import { BrandMasterModel } from "../models/BrandMasterModel";
import { UserModel } from "../models/UserModel";
import { querySchema } from "../types/validations/Queries/queryListAll";
import {
  createBrandMasterSchema,
  updateBrandMasterSchema,
  TCreateBrandMaster,
  TUpdateBrandMaster,
} from "../types/validations/BrandMaster/createBrandMaster";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";

export class BrandMasterService {
  constructor() {}
  private brandMasterModel = new BrandMasterModel();
  private userModel = new UserModel();

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

  async createNewBrandMaster(data: TCreateBrandMaster, user: user) {
    const validData = createBrandMasterSchema.parse(data);

    const {
      admName,
      admEmail,
      admPhone,
      admPassword,
      admUsername,
      ...brandMasterData
    } = validData;

    if (brandMasterData.contract) {
      brandMasterData.contractAt = new Date();
    }

    if (brandMasterData.isPoc) {
      brandMasterData.pocOpenedAt = new Date();
    }

    const newBrandMaster =
      await this.brandMasterModel.createNewBrandMaster(brandMasterData);

    let adminUser = null;
    if (admEmail && admPassword && admUsername) {
      try {
        const hashedPassword = await bcrypt.hash(admPassword, 10);
        adminUser = await this.userModel.createActiveUser({
          username: admUsername,
          email: admEmail,
          password: hashedPassword,
          role: ERole.admin,
          idBrandMaster: newBrandMaster.idBrandMaster,
          profileImgUrl: null,
          fullName: admName || null,
          phone: admPhone || null,
        });
      } catch (error) {
        console.error("Failed to create admin user:", error);
      }
    }

    return { ...newBrandMaster, adminUser };
  }

  private async update({
    validData,
    idBrandMaster,
  }: {
    user: user;
    validData: TUpdateBrandMaster;
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

    const validData = updateBrandMasterSchema.parse(data);

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
