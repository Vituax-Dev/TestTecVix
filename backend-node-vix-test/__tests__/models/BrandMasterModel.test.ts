import { BrandMasterModel } from "../../src/models/BrandMasterModel";
import { prismaMock } from "../singleton";

describe("BrandMasterModel", () => {
  let brandMasterModel: BrandMasterModel;

  beforeEach(() => {
    brandMasterModel = new BrandMasterModel();
  });

  it("should passquery params", async () => {
    prismaMock.brandMaster.findMany.mockResolvedValue([]);
    prismaMock.brandMaster.count.mockResolvedValue(0);
    const r = await brandMasterModel.listAll({
      limit: 10,
      page: 1,
      offset: 1,
      orderBy: [],
    });
    expect(r).toEqual({ totalCount: 0, result: [] });
  });
});
