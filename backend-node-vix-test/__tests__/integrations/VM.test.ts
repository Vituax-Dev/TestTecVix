import request from "supertest";
import { app } from "../../src/app";
import { API_VERSION, ROOT_PATH } from "../../src/constants/basePathRoutes";
import { prismaMock } from "../singleton";
import { VMListMock } from "../__mocks__/VMList";

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.VM;

describe("Testing VM API - listAll", () => {
  it("should return a list of VMs", async () => {});

  it("should return an empty list when no VMs match", async () => {});
});

describe("Testing VM API - getById", () => {
  it("should return a specific VM", async () => {});

  it("should return null when no VMs with the given id", async () => {});
});

describe("Testing VM API - createVM", () => {
  it("should return the created VM", async () => {});

  it("should return Unauthorized if BrandMaster not match", async () => {});

  it("should return Unauthorized if Company not match", async () => {});

  it("should return the created VM if BrandMaster and company match", async () => {});
});

describe("Testing VM API - updateVM", () => {
  it("should return the updated VM", async () => {});

  it("should return Resource not found if VM doesn't exist", async () => {});

  it("should return Unauthorized if BrandMaster not match", async () => {});

  it("should return Unauthorized if Company not match", async () => {});

  it("should return the updated VM if BrandMaster and company match", async () => {});
});

describe("Testing VM API - deleteVM", () => {
  it("should return the deleted VM", async () => {});

  it("should return Resource not found if VM doesn't exist", async () => {});

  it("should return Unauthorized if BrandMaster not exist", async () => {});

  it("should return Unauthorized if BrandMaster not match", async () => {});

  it("should return Unauthorized if Company not match", async () => {});

  it("should return the deleted VM if BrandMaster and company match", async () => {});
});
