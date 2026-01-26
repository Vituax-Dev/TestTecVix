import { BrandMasterService } from "../../src/services/BrandMasterService";
import { BrandMasterModel } from "../../src/models/BrandMasterModel";
// Mocks
jest.mock("../../src/models/BrandMasterModel");


describe("BrandMasterService", () => {
  let brandMasterService: BrandMasterService;
  let brandMasterModel: any;

  beforeEach(() => {
    brandMasterService = new BrandMasterService();
    brandMasterModel = (brandMasterService as any).brandMasterModel;
  });

  describe("updateBrandMaster", () => {
    it("updateBrandMaster should be called", async () => {
      const idbrandMaster = 1;
      brandMasterModel.updateBrandMaster.mockResolvedValue({} as any);
      brandMasterModel.getById.mockResolvedValue({ idbrandMaster: 1 } as any);
      await brandMasterService.updateBrandMaster(idbrandMaster, {}, {
        idBrandMaster: 1,
      } as any);

      expect(brandMasterModel.updateBrandMaster).toHaveBeenCalled();
    });

    it("updateBrandMaster should not be called when user has no access", async () => {
      const idbrandMaster = 1;
      brandMasterModel.updateBrandMaster.mockResolvedValue({} as any);
      // Quando o usuário não tem acesso, getById retorna null
      brandMasterModel.getById.mockResolvedValue(null);
      await expect(
        brandMasterService.updateBrandMaster(idbrandMaster, {}, {
          idBrandMaster: 2,
        } as any),
      ).rejects.toBeTruthy();
    });
  });
});
