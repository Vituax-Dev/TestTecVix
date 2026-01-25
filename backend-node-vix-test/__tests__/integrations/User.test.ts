import request from "supertest";
import { app } from "../../src/app";
import { API_VERSION, ROOT_PATH } from "../../src/constants/basePathRoutes";

const BASE_PATH = API_VERSION.V1 + "/users";

describe("Testing API User", () => {
  let token: string;
  
  it("should return a user by id", async () => {});

  it("should return all users", async () => {});

  it("should create new user", async () => {});

  it("should update a user", async () => {});

  it("should return not found message if a user not exist on trying to update", async () => {});

  it("should delete a user", async () => {});

  it("should return not found message if a user not exist on trying to delete", async () => {});
});
