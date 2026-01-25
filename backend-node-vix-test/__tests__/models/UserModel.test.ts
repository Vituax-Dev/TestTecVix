import { UserModel } from "../../src/models/UserModel";
import { prismaMock } from "../singleton";

describe("UserModel Unit Tests", () => {
  let userModel: UserModel;

  beforeEach(() => {
    userModel = new UserModel();
    jest.clearAllMocks();
  });

  it("should count users correctly", async () => {
    prismaMock.user.count.mockResolvedValue(5);

    const query = {
      search: "test",
      limit: 10,
      page: 0,
      orderBy: []
    };

    const result = await userModel.totalCount(query);

    expect(result).toBe(5);
    expect(prismaMock.user.count).toHaveBeenCalledWith({
      where: {
        deletedAt: null,
        OR: [
          { username: { contains: "test" } },
          { email: { contains: "test" } }
        ]
      }
    });
  });

  it("should count users including deleted when specified", async () => {
    prismaMock.user.count.mockResolvedValue(8);

    const query = {
      search: "",
      limit: 10,
      page: 0,
      orderBy: []
    };

    await userModel.totalCount(query, true);

    expect(prismaMock.user.count).toHaveBeenCalledWith({
      where: {
        OR: [
          { username: { contains: "" } },
          { email: { contains: "" } }
        ]
      }
    });
  });

  it("should handle pagination correctly", async () => {
    const mockUsers = [
      { idUser: "1", username: "user1" },
      { idUser: "2", username: "user2" }
    ];

    prismaMock.user.findMany.mockResolvedValue(mockUsers as any);
    prismaMock.user.count.mockResolvedValue(20);

    const query = {
      limit: 10,
      page: 2,
      search: "",
      orderBy: []
    };

    await userModel.listAll(query);

    expect(prismaMock.user.findMany).toHaveBeenCalledWith({
      where: expect.objectContaining({
        deletedAt: null
      }),
      include: {
        brandMaster: {
          select: {
            idBrandMaster: true,
            brandName: true
          }
        }
      },
      take: 10,
      skip: 20, // page (2) * limit (10)
      orderBy: [{ updatedAt: "desc" }]
    });
  });

  it("should handle custom ordering", async () => {
    prismaMock.user.findMany.mockResolvedValue([]);
    prismaMock.user.count.mockResolvedValue(0);

    const query = {
      limit: 10,
      page: 0,
      search: "",
      orderBy: [
        { field: "username", direction: "asc" },
        { field: "email", direction: "desc" }
      ]
    };

    await userModel.listAll(query);

    expect(prismaMock.user.findMany).toHaveBeenCalledWith({
      where: expect.anything(),
      include: expect.anything(),
      take: 10,
      skip: 0,
      orderBy: [
        { username: "asc" },
        { email: "desc" }
      ]
    });
  });
});