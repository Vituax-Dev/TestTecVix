import request from "supertest";
import { app } from "../../../src/app";
import {
  TEST_USERS,
  TEST_VMS,
  TEST_BRAND_MASTERS,
  loginAs,
  authenticatedRequest,
} from "../helpers";
import { resetDatabase } from "../setup";

const BASE_URL = "/api/v1/vm";

describe("VM Routes E2E Tests", () => {
  // Reset database antes de cada suite
  beforeAll(async () => {
    await resetDatabase();
  }, 30000);

  // ============================================
  // GET /api/v1/vm (list all)
  // ============================================
  describe("GET / (list all)", () => {
    it("should return 401 for unauthenticated request", async () => {
      const res = await request(app).get(BASE_URL);

      expect(res.statusCode).toBe(401);
    });

    it("should return 200 and list VMs for Vituax admin", async () => {
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

    it("should return 200 and list VMs for BrandMaster admin (only own)", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaAdmin.email,
        TEST_USERS.alphaAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.get(BASE_URL);

      expect(res.statusCode).toBe(200);
      expect(res.body.result).toBeDefined();
      // Deve ver apenas VMs do seu BrandMaster
      res.body.result.forEach((vm: { idBrandMaster: number | null }) => {
        expect(vm.idBrandMaster).toBe(TEST_BRAND_MASTERS.alpha.idBrandMaster);
      });
    });

    it("should return 200 for manager", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaManager.email,
        TEST_USERS.alphaManager.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.get(BASE_URL);

      expect(res.statusCode).toBe(200);
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

    it("should filter VMs by search parameter", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.get(`${BASE_URL}?search=Company`);

      expect(res.statusCode).toBe(200);
      expect(res.body.result).toBeDefined();
      res.body.result.forEach((vm: { vmName: string }) => {
        expect(vm.vmName.toLowerCase()).toContain("company");
      });
    });

    it("should filter VMs by status", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.get(`${BASE_URL}?status=RUNNING`);

      expect(res.statusCode).toBe(200);
      res.body.result.forEach((vm: { status: string }) => {
        expect(vm.status).toBe("RUNNING");
      });
    });
  });

  // ============================================
  // GET /api/v1/vm/:idVM
  // ============================================
  describe("GET /:idVM", () => {
    it("should return 401 for unauthenticated request", async () => {
      const res = await request(app).get(`${BASE_URL}/${TEST_VMS.alphaVm1.idVM}`);

      expect(res.statusCode).toBe(401);
    });

    it("should return 200 and VM data for Vituax admin", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.get(`${BASE_URL}/${TEST_VMS.alphaVm1.idVM}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.idVM).toBe(TEST_VMS.alphaVm1.idVM);
      expect(res.body.vmName).toBe(TEST_VMS.alphaVm1.vmName);
    });

    it("should return 200 for BrandMaster admin accessing own VM", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaAdmin.email,
        TEST_USERS.alphaAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.get(`${BASE_URL}/${TEST_VMS.alphaVm1.idVM}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.idVM).toBe(TEST_VMS.alphaVm1.idVM);
    });

    it("should return 404 for BrandMaster admin accessing another's VM", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaAdmin.email,
        TEST_USERS.alphaAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.get(`${BASE_URL}/${TEST_VMS.betaVm.idVM}`);

      expect(res.statusCode).toBe(404);
    });

    it("should return 404 for non-existent VM", async () => {
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
  // POST /api/v1/vm
  // ============================================
  describe("POST /", () => {
    const validVM = {
      vmName: "Test VM",
      vCPU: 2,
      ram: 4,
      disk: 100,
      pass: "TT@@teste1234",
      location: "bre_barueri",
      networkType: "public",
      storageType: "ssd",
      os: "ubuntu2404",
    };

    it("should return 401 for unauthenticated request", async () => {
      const res = await request(app).post(BASE_URL).send(validVM);

      expect(res.statusCode).toBe(401);
    });

    it("should return 403 for member", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaMember.email,
        TEST_USERS.alphaMember.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.post(BASE_URL).send(validVM);

      expect(res.statusCode).toBe(403);
    });

    it("should return 201 for manager creating VM", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaManager.email,
        TEST_USERS.alphaManager.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.post(BASE_URL).send({
        ...validVM,
        vmName: `Manager_VM_${Date.now()}`,
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.vmName).toContain("Manager_VM_");
      expect(res.body.idBrandMaster).toBe(TEST_USERS.alphaManager.idBrandMaster);
    });

    it("should return 201 for admin creating VM", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaAdmin.email,
        TEST_USERS.alphaAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.post(BASE_URL).send({
        ...validVM,
        vmName: `Admin_VM_${Date.now()}`,
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.idBrandMaster).toBe(TEST_USERS.alphaAdmin.idBrandMaster);
    });

    it("should return 201 for Vituax admin creating VM without BrandMaster", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.post(BASE_URL).send({
        ...validVM,
        vmName: `Vituax_VM_${Date.now()}`,
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.idBrandMaster).toBeNull();
    });

    it("should return 400 for missing vCPU", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaAdmin.email,
        TEST_USERS.alphaAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const { vCPU, ...invalidData } = validVM;

      const res = await req.post(BASE_URL).send(invalidData);

      expect(res.statusCode).toBe(400);
    });

    it("should return 400 for missing ram", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaAdmin.email,
        TEST_USERS.alphaAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const { ram, ...invalidData } = validVM;

      const res = await req.post(BASE_URL).send(invalidData);

      expect(res.statusCode).toBe(400);
    });

    it("should return 400 for missing disk", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaAdmin.email,
        TEST_USERS.alphaAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const { disk, ...invalidData } = validVM;

      const res = await req.post(BASE_URL).send(invalidData);

      expect(res.statusCode).toBe(400);
    });

    it("should return 400 for missing pass", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaAdmin.email,
        TEST_USERS.alphaAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const { pass, ...invalidData } = validVM;

      const res = await req.post(BASE_URL).send(invalidData);

      expect(res.statusCode).toBe(400);
    });

    it("should return 400 for missing location", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaAdmin.email,
        TEST_USERS.alphaAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const { location, ...invalidData } = validVM;

      const res = await req.post(BASE_URL).send(invalidData);

      expect(res.statusCode).toBe(400);
    });

    it("should return 400 for invalid location", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaAdmin.email,
        TEST_USERS.alphaAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.post(BASE_URL).send({
        ...validVM,
        location: "invalid_location",
      });

      expect(res.statusCode).toBe(400);
    });

    it("should return 400 for disk too small", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaAdmin.email,
        TEST_USERS.alphaAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.post(BASE_URL).send({
        ...validVM,
        disk: 10, // Mínimo é 20
      });

      expect(res.statusCode).toBe(400);
    });

    it("should return 400 for password too short", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaAdmin.email,
        TEST_USERS.alphaAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.post(BASE_URL).send({
        ...validVM,
        pass: "short", // Mínimo é 12
      });

      expect(res.statusCode).toBe(400);
    });
  });

  // ============================================
  // PUT /api/v1/vm/:idVM
  // ============================================
  describe("PUT /:idVM", () => {
    it("should return 401 for unauthenticated request", async () => {
      const res = await request(app)
        .put(`${BASE_URL}/${TEST_VMS.alphaVm1.idVM}`)
        .send({ vmName: "Updated Name" });

      expect(res.statusCode).toBe(401);
    });

    it("should return 403 for member", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaMember.email,
        TEST_USERS.alphaMember.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req
        .put(`${BASE_URL}/${TEST_VMS.alphaVm1.idVM}`)
        .send({ vmName: "Updated Name" });

      expect(res.statusCode).toBe(403);
    });

    it("should return 204 for manager updating own VM", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaManager.email,
        TEST_USERS.alphaManager.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req
        .put(`${BASE_URL}/${TEST_VMS.alphaVm1.idVM}`)
        .send({ vmName: `Updated_${Date.now()}` });

      expect(res.statusCode).toBe(204);
    });

    it("should return 204 for admin updating VM", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaAdmin.email,
        TEST_USERS.alphaAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req
        .put(`${BASE_URL}/${TEST_VMS.alphaVm1.idVM}`)
        .send({ vCPU: 4 });

      expect(res.statusCode).toBe(204);
    });

    it("should return 204 for Vituax admin updating any VM", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req
        .put(`${BASE_URL}/${TEST_VMS.betaVm.idVM}`)
        .send({ ram: 8 });

      expect(res.statusCode).toBe(204);
    });

    it("should return 404 for manager updating another BrandMaster's VM", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaManager.email,
        TEST_USERS.alphaManager.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req
        .put(`${BASE_URL}/${TEST_VMS.betaVm.idVM}`)
        .send({ vmName: "Hacked Name" });

      expect(res.statusCode).toBe(404);
    });

    it("should return 404 for non-existent VM", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.put(`${BASE_URL}/99999`).send({ vmName: "Test" });

      expect(res.statusCode).toBe(404);
    });

    it("should return 204 when updating status", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaAdmin.email,
        TEST_USERS.alphaAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req
        .put(`${BASE_URL}/${TEST_VMS.alphaVm1.idVM}`)
        .send({ status: "STOPPED" });

      expect(res.statusCode).toBe(204);
    });

    it("should return 204 when updating hasBackup", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaAdmin.email,
        TEST_USERS.alphaAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req
        .put(`${BASE_URL}/${TEST_VMS.alphaVm1.idVM}`)
        .send({ hasBackup: true });

      expect(res.statusCode).toBe(204);
    });
  });

  // ============================================
  // DELETE /api/v1/vm/:idVM
  // ============================================
  describe("DELETE /:idVM", () => {
    let vmToDeleteId: number;

    beforeEach(async () => {
      // Cria uma VM para deletar em cada teste
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.post(BASE_URL).send({
        vmName: `ToDelete_${Date.now()}`,
        vCPU: 1,
        ram: 1,
        disk: 20,
        pass: "TT@@teste1234",
        location: "bre_barueri",
        networkType: "public",
        storageType: "ssd",
      });

      vmToDeleteId = res.body.idVM;
    });

    it("should return 401 for unauthenticated request", async () => {
      const res = await request(app).delete(`${BASE_URL}/${vmToDeleteId}`);

      expect(res.statusCode).toBe(401);
    });

    it("should return 403 for member", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxMember.email,
        TEST_USERS.vituaxMember.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.delete(`${BASE_URL}/${vmToDeleteId}`);

      expect(res.statusCode).toBe(403);
    });

    it("should return 403 for manager", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxManager.email,
        TEST_USERS.vituaxManager.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.delete(`${BASE_URL}/${vmToDeleteId}`);

      expect(res.statusCode).toBe(403);
    });

    it("should return 204 for admin deleting VM", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.delete(`${BASE_URL}/${vmToDeleteId}`);

      expect(res.statusCode).toBe(204);
    });

    it("should return 404 for non-existent VM", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.delete(`${BASE_URL}/99999`);

      expect(res.statusCode).toBe(404);
    });

    it("should return 404 for BrandMaster admin deleting another's VM", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaAdmin.email,
        TEST_USERS.alphaAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.delete(`${BASE_URL}/${TEST_VMS.betaVm.idVM}`);

      expect(res.statusCode).toBe(404);
    });
  });
});
