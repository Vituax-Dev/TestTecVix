import request from "supertest";
import { app } from "../../../src/app";
import {
  TEST_USERS,
  TEST_BRAND_MASTERS,
  loginAs,
  authenticatedRequest,
} from "../helpers";
import { resetDatabase } from "../setup";

const BASE_URL = "/api/v1/brand-master";

describe("BrandMaster Routes E2E Tests", () => {
  // Reset database antes de cada suite
  beforeAll(async () => {
    await resetDatabase();
  }, 30000);

  // ============================================
  // GET /api/v1/brand-master/self
  // ============================================
  describe("GET /self", () => {
    it("should return 200 with brand data when domain matches", async () => {
      const res = await request(app)
        .get(`${BASE_URL}/self`)
        .set("Host", TEST_BRAND_MASTERS.alpha.domain);

      expect(res.statusCode).toBe(200);
    });

    it("should return 200 with null when domain does not match", async () => {
      const res = await request(app)
        .get(`${BASE_URL}/self`)
        .set("Host", "unknown-domain.com");

      expect(res.statusCode).toBe(200);
      expect(res.body).toBeNull();
    });

    it("should work without authentication", async () => {
      const res = await request(app).get(`${BASE_URL}/self`);

      expect(res.statusCode).toBe(200);
    });
  });

  // ============================================
  // GET /api/v1/brand-master (list all)
  // ============================================
  describe("GET / (list all)", () => {
    it("should return 401 for unauthenticated request", async () => {
      const res = await request(app).get(BASE_URL);

      expect(res.statusCode).toBe(401);
    });

    it("should return 200 and list brand masters for Vituax admin", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.get(BASE_URL);

      expect(res.statusCode).toBe(200);
      expect(res.body.result).toBeDefined();
      expect(Array.isArray(res.body.result)).toBe(true);
    });

    it("should return 200 for BrandMaster admin (only sees own)", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaAdmin.email,
        TEST_USERS.alphaAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.get(BASE_URL);

      expect(res.statusCode).toBe(200);
      expect(res.body.result).toBeDefined();
      // Deve ver apenas seu próprio BrandMaster
      res.body.result.forEach((bm: { idBrandMaster: number }) => {
        expect(bm.idBrandMaster).toBe(TEST_BRAND_MASTERS.alpha.idBrandMaster);
      });
    });

    it("should return 200 for member", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaMember.email,
        TEST_USERS.alphaMember.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.get(BASE_URL);

      expect(res.statusCode).toBe(200);
    });
  });

  // ============================================
  // GET /api/v1/brand-master/:idBrandMaster
  // ============================================
  describe("GET /:idBrandMaster", () => {
    it("should return 401 for unauthenticated request", async () => {
      const res = await request(app).get(
        `${BASE_URL}/${TEST_BRAND_MASTERS.alpha.idBrandMaster}`,
      );

      expect(res.statusCode).toBe(401);
    });

    it("should return 200 and brand master data for Vituax admin", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.get(
        `${BASE_URL}/${TEST_BRAND_MASTERS.alpha.idBrandMaster}`,
      );

      expect(res.statusCode).toBe(200);
      expect(res.body.idBrandMaster).toBe(TEST_BRAND_MASTERS.alpha.idBrandMaster);
      expect(res.body.brandName).toBe(TEST_BRAND_MASTERS.alpha.brandName);
    });

    it("should return 200 for BrandMaster admin accessing own", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaAdmin.email,
        TEST_USERS.alphaAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.get(
        `${BASE_URL}/${TEST_BRAND_MASTERS.alpha.idBrandMaster}`,
      );

      expect(res.statusCode).toBe(200);
      expect(res.body.idBrandMaster).toBe(TEST_BRAND_MASTERS.alpha.idBrandMaster);
    });

    it("should return 404 for BrandMaster admin accessing another", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaAdmin.email,
        TEST_USERS.alphaAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.get(
        `${BASE_URL}/${TEST_BRAND_MASTERS.beta.idBrandMaster}`,
      );

      expect(res.statusCode).toBe(404);
    });

    it("should return 404 for non-existent brand master", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.get(`${BASE_URL}/99999`);

      expect(res.statusCode).toBe(404);
    });

    it("should return 400 for invalid id format", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.get(`${BASE_URL}/invalid`);

      expect(res.statusCode).toBe(400);
    });
  });

  // ============================================
  // POST /api/v1/brand-master
  // ============================================
  describe("POST /", () => {
    const validBrandMaster = {
      brandName: "Test Brand",
      admEmail: "newadmin@testbrand.com",
      admPassword: "Test@123456",
      admUsername: "testadmin",
      domain: "testbrand.com",
      cnpj: "11.111.111/0001-11",
    };

    it("should return 401 for unauthenticated request", async () => {
      const res = await request(app).post(BASE_URL).send(validBrandMaster);

      expect(res.statusCode).toBe(401);
    });

    it("should return 403 for member", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxMember.email,
        TEST_USERS.vituaxMember.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.post(BASE_URL).send(validBrandMaster);

      expect(res.statusCode).toBe(403);
    });

    it("should return 201 for manager creating brand master", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxManager.email,
        TEST_USERS.vituaxManager.password,
      );
      const req = authenticatedRequest(cookies);

      const uniqueBrand = {
        ...validBrandMaster,
        admEmail: `manager_${Date.now()}@test.com`,
        admUsername: `manager_${Date.now()}`,
        cnpj: `${Date.now()}`.slice(0, 14),
      };

      const res = await req.post(BASE_URL).send(uniqueBrand);

      expect(res.statusCode).toBe(201);
      expect(res.body.brandName).toBe(uniqueBrand.brandName);
    });

    it("should return 201 for admin creating brand master", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const uniqueBrand = {
        ...validBrandMaster,
        admEmail: `admin_${Date.now()}@test.com`,
        admUsername: `admin_${Date.now()}`,
        cnpj: `${Date.now() + 1}`.slice(0, 14),
      };

      const res = await req.post(BASE_URL).send(uniqueBrand);

      expect(res.statusCode).toBe(201);
    });

    it("should return 400 for missing admEmail", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const { admEmail, ...invalidData } = validBrandMaster;

      const res = await req.post(BASE_URL).send(invalidData);

      expect(res.statusCode).toBe(400);
    });

    it("should return 400 for missing admPassword", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const { admPassword, ...invalidData } = validBrandMaster;

      const res = await req.post(BASE_URL).send(invalidData);

      expect(res.statusCode).toBe(400);
    });

    it("should return 400 for missing admUsername", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const { admUsername, ...invalidData } = validBrandMaster;

      const res = await req.post(BASE_URL).send(invalidData);

      expect(res.statusCode).toBe(400);
    });

    it("should return 400 for invalid email format", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.post(BASE_URL).send({
        ...validBrandMaster,
        admEmail: "invalid-email",
      });

      expect(res.statusCode).toBe(400);
    });

    it("should return 400 for weak password", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.post(BASE_URL).send({
        ...validBrandMaster,
        admPassword: "weak",
      });

      expect(res.statusCode).toBe(400);
    });
  });

  // ============================================
  // PUT /api/v1/brand-master/:idBrandMaster
  // ============================================
  describe("PUT /:idBrandMaster", () => {
    it("should return 401 for unauthenticated request", async () => {
      const res = await request(app)
        .put(`${BASE_URL}/${TEST_BRAND_MASTERS.alpha.idBrandMaster}`)
        .send({ brandName: "Updated Name" });

      expect(res.statusCode).toBe(401);
    });

    it("should return 403 for member", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaMember.email,
        TEST_USERS.alphaMember.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req
        .put(`${BASE_URL}/${TEST_BRAND_MASTERS.alpha.idBrandMaster}`)
        .send({ brandName: "Updated Name" });

      expect(res.statusCode).toBe(403);
    });

    it("should return 204 for manager updating own brand master", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaManager.email,
        TEST_USERS.alphaManager.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req
        .put(`${BASE_URL}/${TEST_BRAND_MASTERS.alpha.idBrandMaster}`)
        .send({ brandName: `Updated_${Date.now()}` });

      expect(res.statusCode).toBe(204);
    });

    it("should return 204 for admin updating brand master", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaAdmin.email,
        TEST_USERS.alphaAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req
        .put(`${BASE_URL}/${TEST_BRAND_MASTERS.alpha.idBrandMaster}`)
        .send({ city: "São Paulo" });

      expect(res.statusCode).toBe(204);
    });

    it("should return 204 for Vituax admin updating any brand master", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req
        .put(`${BASE_URL}/${TEST_BRAND_MASTERS.beta.idBrandMaster}`)
        .send({ city: "Rio de Janeiro" });

      expect(res.statusCode).toBe(204);
    });

    it("should return 404 for manager updating another brand master", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaManager.email,
        TEST_USERS.alphaManager.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req
        .put(`${BASE_URL}/${TEST_BRAND_MASTERS.beta.idBrandMaster}`)
        .send({ brandName: "Hacked Name" });

      expect(res.statusCode).toBe(404);
    });

    it("should return 404 for non-existent brand master", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req
        .put(`${BASE_URL}/99999`)
        .send({ brandName: "Test" });

      expect(res.statusCode).toBe(404);
    });
  });

  // ============================================
  // DELETE /api/v1/brand-master/:idBrandMaster
  // ============================================
  describe("DELETE /:idBrandMaster", () => {
    let brandToDeleteId: number;

    beforeEach(async () => {
      // Cria um brand master para deletar em cada teste
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.post(BASE_URL).send({
        brandName: `ToDelete_${Date.now()}`,
        admEmail: `delete_${Date.now()}@test.com`,
        admPassword: "Test@123456",
        admUsername: `delete_${Date.now()}`,
        cnpj: `${Date.now()}`.slice(0, 14),
      });

      brandToDeleteId = res.body.idBrandMaster;
    });

    it("should return 401 for unauthenticated request", async () => {
      const res = await request(app).delete(`${BASE_URL}/${brandToDeleteId}`);

      expect(res.statusCode).toBe(401);
    });

    it("should return 403 for member", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxMember.email,
        TEST_USERS.vituaxMember.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.delete(`${BASE_URL}/${brandToDeleteId}`);

      expect(res.statusCode).toBe(403);
    });

    it("should return 403 for manager", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxManager.email,
        TEST_USERS.vituaxManager.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.delete(`${BASE_URL}/${brandToDeleteId}`);

      expect(res.statusCode).toBe(403);
    });

    it("should return 204 for admin deleting brand master", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.delete(`${BASE_URL}/${brandToDeleteId}`);

      expect(res.statusCode).toBe(204);
    });

    it("should return 404 for non-existent brand master", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.delete(`${BASE_URL}/99999`);

      expect(res.statusCode).toBe(404);
    });

    it("should return 404 for BrandMaster admin deleting another", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaAdmin.email,
        TEST_USERS.alphaAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.delete(
        `${BASE_URL}/${TEST_BRAND_MASTERS.beta.idBrandMaster}`,
      );

      expect(res.statusCode).toBe(404);
    });
  });
});
