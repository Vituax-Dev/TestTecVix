import { brandMaster, user } from "@prisma/client";
import { BrandMasterModel } from "../models/BrandMasterModel";
import { querySchema } from "../types/validations/Queries/queryListAll";
import {
  brandMasterSchema,
  brandMasterUpdateSchema,
  TBrandMaster,
  TBrandMasterUpdate,
} from "../types/validations/BrandMaster/createBrandMaster";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { prisma } from "../database/client";
import bcrypt from "bcryptjs";
import { BucketLocalService } from "./BucketLocalService";

export class BrandMasterService {
  constructor() {}
  private brandMasterModel = new BrandMasterModel();
  private bucketService = new BucketLocalService();

  /**
   * Helper to check if user is from Vituax (can manage all MSPs)
   */
  private isVituaxUser(user: user): boolean {
    return user.idBrandMaster === null;
  }

  /**
   * Helper to check if user is admin or manager
   */
  private isAdminOrManager(user: user): boolean {
    return user.role === "admin" || user.role === "manager";
  }

  async getSelf(domain: string) {
    return await this.brandMasterModel.getSelf(domain);
  }

  async getById(idBrandMaster: number) {
    return this.brandMasterModel.getById(idBrandMaster);
  }

  async listAll(query: unknown, requestingUser: user) {
    const validQuery = querySchema.parse(query);

    // Members cannot see any MSP listing
    if (requestingUser.role === "member") {
      return { totalCount: 0, result: [] };
    }

    // Vituax users see all MSPs
    if (this.isVituaxUser(requestingUser)) {
      return this.brandMasterModel.listAll(validQuery, validQuery.includeDeleted);
    }

    // MSP Admin/Manager sees only their own company
    if (requestingUser.idBrandMaster) {
      const ownBrand = await this.brandMasterModel.getById(requestingUser.idBrandMaster);
      if (!ownBrand) {
        return { totalCount: 0, result: [] };
      }
      return { totalCount: 1, result: [ownBrand] };
    }

    return { totalCount: 0, result: [] };
  }

  /**
   * Cria um novo MSP com admin obrigatório em uma transação
   * Se qualquer um falhar, faz rollback automático
   * ONLY Vituax Admin/Manager can create MSPs
   */
  async createNewBrandMaster(data: TBrandMaster, requestingUser: user) {
    // Only Vituax Admin/Manager can create MSPs
    if (!this.isVituaxUser(requestingUser) || !this.isAdminOrManager(requestingUser)) {
      throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
    }
    const validData = brandMasterSchema.parse(data);
    const { admin: adminData, ...mspData } = validData;

    // Verificar se email do admin já existe
    const existingUser = await prisma.user.findFirst({
      where: { email: adminData.email, deletedAt: null },
    });

    if (existingUser) {
      throw new AppError(
        "Email do administrador já está em uso",
        STATUS_CODE.BAD_REQUEST
      );
    }

    if (mspData.contract) {
      mspData.contractAt = new Date();
    }

    if (mspData.isPoc) {
      mspData.pocOpenedAt = new Date();
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    // Transação: criar MSP + Admin ou nenhum
    const result = await prisma.$transaction(async (tx) => {
      // 1. Criar o BrandMaster
      const newBrandMaster = await tx.brandMaster.create({
        data: {
          brandName: mspData.brandName,
          isActive: mspData.isActive ?? true,
          brandLogo: mspData.brandLogo,
          domain: mspData.domain,
          contract: mspData.contract,
          setorName: mspData.setorName,
          fieldName: mspData.fieldName,
          location: mspData.location,
          city: mspData.city,
          emailContact: mspData.emailContact,
          smsContact: mspData.smsContact,
          timezone: mspData.timezone,
          state: mspData.state,
          street: mspData.street,
          placeNumber: mspData.placeNumber,
          cep: mspData.cep,
          cnpj: mspData.cnpj,
          cityCode: mspData.cityCode,
          district: mspData.district,
          isPoc: mspData.isPoc,
          contractAt: mspData.contractAt,
          pocOpenedAt: mspData.pocOpenedAt,
          minConsumption: mspData.minConsumption,
          discountPercentage: mspData.discountPercentage,
        },
      });

      // 2. Criar o usuário admin vinculado ao MSP
      const newAdmin = await tx.user.create({
        data: {
          username: adminData.username,
          email: adminData.email,
          password: hashedPassword,
          phone: adminData.phone,
          role: "admin",
          idBrandMaster: newBrandMaster.idBrandMaster,
          isActive: true,
        },
      });

      return { brandMaster: newBrandMaster, admin: newAdmin };
    });

    return result;
  }

  private async update({
    validData,
    idBrandMaster,
    oldBrandMaster,
  }: {
    validData: TBrandMasterUpdate;
    idBrandMaster: number;
    oldBrandMaster: brandMaster;
  }) {
    // Guarda o logo antigo para deletar APÓS o save
    const oldLogo = oldBrandMaster.brandLogo;
    const newLogo = validData.brandLogo;
    // Delete old logo if: there was an old logo AND (new logo is different OR logo was removed)
    const logoWasChanged = newLogo !== undefined && newLogo !== oldLogo;
    const shouldDeleteOldLogo = oldLogo && logoWasChanged;

    // Primeiro salva no banco
    const result = await this.brandMasterModel.updateBrandMaster(
      idBrandMaster,
      validData
    );

    // Só deleta a imagem antiga APÓS o save ter sucesso
    if (shouldDeleteOldLogo) {
      await this.bucketService.deleteFile(oldLogo);
    }

    return result;
  }

  async updateBrandMaster(idBrandMaster: number, data: unknown, requestingUser: user) {
    // Check authorization:
    // - Vituax Admin/Manager can update any MSP
    // - MSP Admin/Manager can only update their own MSP
    // - Members cannot update
    if (requestingUser.role === "member") {
      throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
    }

    if (!this.isVituaxUser(requestingUser) && requestingUser.idBrandMaster !== idBrandMaster) {
      throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
    }

    const validData = brandMasterUpdateSchema.parse(data);
    const oldBrandMaster = await this.brandMasterModel.getById(idBrandMaster);
    if (!oldBrandMaster) {
      throw new AppError(
        ERROR_MESSAGE.BRAND_MASTER_NOT_FOUND,
        STATUS_CODE.NOT_FOUND
      );
    }

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
      validData,
      idBrandMaster,
      oldBrandMaster,
    });
  }

  async deleteBrandMaster(idBrandMaster: number, requestingUser: user) {
    // Only Vituax Admin can delete MSPs
    if (!this.isVituaxUser(requestingUser) || requestingUser.role !== "admin") {
      throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
    }

    const oldBrandMaster = await this.brandMasterModel.getById(idBrandMaster);
    if (!oldBrandMaster) {
      throw new AppError(
        ERROR_MESSAGE.BRAND_MASTER_NOT_FOUND,
        STATUS_CODE.NOT_FOUND
      );
    }

    // Soft delete do BrandMaster e de todos os usuários vinculados em transação
    const result = await prisma.$transaction(async (tx) => {
      // 1. Soft delete de todos os usuários vinculados ao MSP
      await tx.user.updateMany({
        where: {
          idBrandMaster,
          deletedAt: null,
        },
        data: {
          deletedAt: new Date(),
          updatedAt: new Date(),
        },
      });

      // 2. Soft delete do BrandMaster
      const deletedBrand = await tx.brandMaster.update({
        where: { idBrandMaster },
        data: {
          deletedAt: new Date(),
          updatedAt: new Date(),
        },
      });

      return deletedBrand;
    });

    return {
      brandMaster: result,
    };
  }

  /**
   * Reativa um MSP e todos os usuários vinculados (que foram soft deleted junto)
   * Only Vituax Admin can reactivate MSPs
   */
  async reactivateBrandMaster(idBrandMaster: number, requestingUser: user) {
    // Only Vituax Admin can reactivate MSPs
    if (!this.isVituaxUser(requestingUser) || requestingUser.role !== "admin") {
      throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
    }

    // Busca o MSP mesmo se deletado
    const oldBrandMaster = await prisma.brandMaster.findUnique({
      where: { idBrandMaster },
    });

    if (!oldBrandMaster) {
      throw new AppError(
        ERROR_MESSAGE.BRAND_MASTER_NOT_FOUND,
        STATUS_CODE.NOT_FOUND
      );
    }

    if (!oldBrandMaster.deletedAt) {
      throw new AppError(
        "MSP já está ativo",
        STATUS_CODE.BAD_REQUEST
      );
    }

    // Reativar MSP e usuários em transação
    const result = await prisma.$transaction(async (tx) => {
      // 1. Reativar todos os usuários vinculados ao MSP
      await tx.user.updateMany({
        where: {
          idBrandMaster,
          deletedAt: { not: null },
        },
        data: {
          deletedAt: null,
          updatedAt: new Date(),
        },
      });

      // 2. Reativar o BrandMaster
      const reactivatedBrand = await tx.brandMaster.update({
        where: { idBrandMaster },
        data: {
          deletedAt: null,
          updatedAt: new Date(),
        },
      });

      return reactivatedBrand;
    });

    return {
      brandMaster: result,
    };
  }
}
