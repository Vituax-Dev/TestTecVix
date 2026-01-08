import { BrandMasterService } from "../../src/services/BrandMasterService";
import { BrandMasterModel } from "../../src/models/BrandMasterModel";
// Mocks
jest.mock("../../src/models/BrandMasterModel");
jest.mock("../../src/models/LogBrandMasterModel");

describe("BrandMasterService", () => {
  let brandMasterService: BrandMasterService;
  let brandMasterModel: jest.Mocked<BrandMasterModel>;

  beforeEach(() => {
    brandMasterModel = new BrandMasterModel() as jest.Mocked<BrandMasterModel>;
    brandMasterService = new BrandMasterService(brandMasterModel);
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

    it("updateBrandMaster should not be called", async () => {
      const idbrandMaster = 1;
      brandMasterModel.updateBrandMaster.mockResolvedValue({} as any);
      brandMasterModel.getById.mockResolvedValue({ idbrandMaster: 1 } as any);
      await expect(
        brandMasterService.updateBrandMaster(idbrandMaster, {}, {
          idBrandMaster: 2,
        } as any),
      ).rejects.toBeTruthy();
    });

    it("updateBrandMaster should not be called because idCompany was founded", async () => {
      const idbrandMaster = 1;
      brandMasterModel.updateBrandMaster.mockResolvedValue({} as any);
      brandMasterModel.getById.mockResolvedValue({ idbrandMaster: 1 } as any);

      await expect(
        brandMasterService.updateBrandMaster(idbrandMaster, {}, {
          idBrandMaster: 1,
          idCompany: 1,
        } as any),
      ).rejects.toBeTruthy();
    });
  });
});
