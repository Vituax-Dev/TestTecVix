import request from "supertest";
import { app } from "../../src/app";
import { API_VERSION, ROOT_PATH } from "../../src/constants/basePathRoutes";

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.BRANDMASTER;

describe("Testing API BrandMaster", () => {
  let token: string;

  it("should return a brand by id", async () => {});

  it("should return all brands", async () => {});

  it("should create new brand", async () => {});

  it("should update a brand", async () => {});

  it("should return not found message if a brand not exist on trying to update", async () => {});

  it("should delete a brand", async () => {});

  it("should return not found message if a brand not exist on trying to delete", async () => {});
});
