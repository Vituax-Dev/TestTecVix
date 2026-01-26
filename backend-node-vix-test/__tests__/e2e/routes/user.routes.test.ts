import request from "supertest";
import { app } from "../../../src/app";
import {
  TEST_USERS,
  loginAs,
  authenticatedRequest,
  generateUniqueEmail,
  generateUniqueUsername,
} from "../helpers";
import { resetDatabase } from "../setup";

const BASE_URL = "/api/v1/user";

describe("User Routes E2E Tests", () => {
  // Reset database antes de cada suite que modifica dados
  beforeAll(async () => {
    await resetDatabase();
  }, 30000);

  // ============================================
  // POST /api/v1/user/login
  // ============================================
  describe("POST /login", () => {
    it("should return 200 and user data on successful login", async () => {
      const res = await request(app).post(`${BASE_URL}/login`).send({
        email: TEST_USERS.vituaxAdmin.email,
        password: TEST_USERS.vituaxAdmin.password,
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.user).toBeDefined();
      expect(res.body.user.email).toBe(TEST_USERS.vituaxAdmin.email);
      expect(res.body.user.role).toBe("admin");
      expect(res.headers["set-cookie"]).toBeDefined();
    });

    it("should return 401 for invalid email", async () => {
      const res = await request(app).post(`${BASE_URL}/login`).send({
        email: "nonexistent@test.com",
        password: "Admin@123",
      });

      expect(res.statusCode).toBe(401);
    });

    it("should return 401 for invalid password", async () => {
      const res = await request(app).post(`${BASE_URL}/login`).send({
        email: TEST_USERS.vituaxAdmin.email,
        password: "WrongPassword@123",
      });

      expect(res.statusCode).toBe(401);
    });

    it("should return 400 for missing email", async () => {
      const res = await request(app).post(`${BASE_URL}/login`).send({
        password: "Admin@123",
      });

      expect(res.statusCode).toBe(400);
    });

    it("should return 400 for missing password", async () => {
      const res = await request(app).post(`${BASE_URL}/login`).send({
        email: TEST_USERS.vituaxAdmin.email,
      });

      expect(res.statusCode).toBe(400);
    });

    it("should return 400 for invalid email format", async () => {
      const res = await request(app).post(`${BASE_URL}/login`).send({
        email: "invalid-email",
        password: "Admin@123",
      });

      expect(res.statusCode).toBe(400);
    });

    it("should return 401 for deleted user", async () => {
      const res = await request(app).post(`${BASE_URL}/login`).send({
        email: TEST_USERS.deletedUser.email,
        password: TEST_USERS.deletedUser.password,
      });

      expect(res.statusCode).toBe(401);
    });
  });

  // ============================================
  // POST /api/v1/user/logout
  // ============================================
  describe("POST /logout", () => {
    it("should return 200 on logout", async () => {
      const res = await request(app).post(`${BASE_URL}/logout`);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Logged out");
    });
  });

  // ============================================
  // POST /api/v1/user/register (public registration)
  // ============================================
  describe("POST /register (public registration)", () => {
    it("should return 201 and create a new user", async () => {
      const uniqueEmail = generateUniqueEmail();
      const uniqueUsername = generateUniqueUsername();

      const res = await request(app).post(`${BASE_URL}/register`).send({
        email: uniqueEmail,
        username: uniqueUsername,
        password: "Test@123456",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.email).toBe(uniqueEmail);
      expect(res.body.username).toBe(uniqueUsername);
      expect(res.body.role).toBe("member");
      // Não deve retornar a senha
      expect(res.body.password).toBeUndefined();
    });

    it("should return 400 for missing email", async () => {
      const res = await request(app).post(`${BASE_URL}/register`).send({
        username: "testuser",
        password: "Test@123456",
      });

      expect(res.statusCode).toBe(400);
    });

    it("should return 400 for missing username", async () => {
      const res = await request(app).post(`${BASE_URL}/register`).send({
        email: generateUniqueEmail(),
        password: "Test@123456",
      });

      expect(res.statusCode).toBe(400);
    });

    it("should return 400 for missing password", async () => {
      const res = await request(app).post(`${BASE_URL}/register`).send({
        email: generateUniqueEmail(),
        username: "testuser",
      });

      expect(res.statusCode).toBe(400);
    });

    it("should return 400 for invalid email format", async () => {
      const res = await request(app).post(`${BASE_URL}/register`).send({
        email: "invalid-email",
        username: "testuser",
        password: "Test@123456",
      });

      expect(res.statusCode).toBe(400);
    });

    it("should return 400 for weak password (no uppercase)", async () => {
      const res = await request(app).post(`${BASE_URL}/register`).send({
        email: generateUniqueEmail(),
        username: "testuser",
        password: "test@123456",
      });

      expect(res.statusCode).toBe(400);
    });

    it("should return 400 for weak password (no special character)", async () => {
      const res = await request(app).post(`${BASE_URL}/register`).send({
        email: generateUniqueEmail(),
        username: "testuser",
        password: "Test123456",
      });

      expect(res.statusCode).toBe(400);
    });

    it("should return 400 for weak password (too short)", async () => {
      const res = await request(app).post(`${BASE_URL}/register`).send({
        email: generateUniqueEmail(),
        username: "testuser",
        password: "Te@1",
      });

      expect(res.statusCode).toBe(400);
    });

    it("should return 409 for duplicate email", async () => {
      const res = await request(app).post(`${BASE_URL}/register`).send({
        email: TEST_USERS.vituaxAdmin.email,
        username: "newuser",
        password: "Test@123456",
      });

      expect(res.statusCode).toBe(409);
    });
  });

  // ============================================
  // GET /api/v1/user (list all)
  // ============================================
  describe("GET / (list all)", () => {
    it("should return 401 for unauthenticated request", async () => {
      const res = await request(app).get(BASE_URL);

      expect(res.statusCode).toBe(401);
    });

    it("should return 200 and list users for authenticated admin", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.get(BASE_URL);

      expect(res.statusCode).toBe(200);
      expect(res.body.result).toBeDefined();
      expect(Array.isArray(res.body.result)).toBe(true);
      expect(res.body.totalCount).toBeGreaterThan(0);
    });

    it("should return 200 and list users for authenticated manager", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxManager.email,
        TEST_USERS.vituaxManager.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.get(BASE_URL);

      expect(res.statusCode).toBe(200);
      expect(res.body.result).toBeDefined();
    });

    it("should return 200 and list users for authenticated member", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxMember.email,
        TEST_USERS.vituaxMember.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.get(BASE_URL);

      expect(res.statusCode).toBe(200);
    });

    it("should filter users by search parameter", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.get(`${BASE_URL}?search=admin`);

      expect(res.statusCode).toBe(200);
      expect(res.body.result).toBeDefined();
      // Todos os resultados devem conter "admin" no nome ou email
      res.body.result.forEach((user: { username: string; email: string }) => {
        const matchesSearch =
          user.username.toLowerCase().includes("admin") ||
          user.email.toLowerCase().includes("admin");
        expect(matchesSearch).toBe(true);
      });
    });

    it("should filter users by idBrandMaster (Vituax admin can see all)", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.get(`${BASE_URL}?idBrandMaster=1`);

      expect(res.statusCode).toBe(200);
      // Todos os resultados devem pertencer ao BrandMaster 1
      res.body.result.forEach((user: { idBrandMaster: number }) => {
        expect(user.idBrandMaster).toBe(1);
      });
    });

    it("should only show users from same BrandMaster for non-Vituax users", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaAdmin.email,
        TEST_USERS.alphaAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.get(BASE_URL);

      expect(res.statusCode).toBe(200);
      // Todos os resultados devem pertencer ao BrandMaster 1 (Alpha)
      res.body.result.forEach((user: { idBrandMaster: number }) => {
        expect(user.idBrandMaster).toBe(1);
      });
    });
  });

  // ============================================
  // GET /api/v1/user/me
  // ============================================
  describe("GET /me", () => {
    it("should return 401 for unauthenticated request", async () => {
      const res = await request(app).get(`${BASE_URL}/me`);

      expect(res.statusCode).toBe(401);
    });

    it("should return 200 and current user data", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.get(`${BASE_URL}/me`);

      expect(res.statusCode).toBe(200);
      expect(res.body.email).toBe(TEST_USERS.vituaxAdmin.email);
      expect(res.body.role).toBe("admin");
      expect(res.body.password).toBeUndefined();
    });
  });

  // ============================================
  // GET /api/v1/user/:idUser
  // ============================================
  describe("GET /:idUser", () => {
    it("should return 401 for unauthenticated request", async () => {
      const res = await request(app).get(
        `${BASE_URL}/${TEST_USERS.vituaxAdmin.idUser}`,
      );

      expect(res.statusCode).toBe(401);
    });

    it("should return 200 and user data for valid id", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.get(`${BASE_URL}/${TEST_USERS.vituaxManager.idUser}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.email).toBe(TEST_USERS.vituaxManager.email);
    });

    it("should return 404 for non-existent user", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.get(
        `${BASE_URL}/550e8400-e29b-41d4-a716-999999999999`,
      );

      expect(res.statusCode).toBe(404);
    });

    it("should return 400 for invalid UUID format", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.get(`${BASE_URL}/invalid-uuid`);

      expect(res.statusCode).toBe(400);
    });

    it("should return 404 when BrandMaster user tries to access user from another BrandMaster", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaAdmin.email,
        TEST_USERS.alphaAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      // Alpha admin tenta acessar usuário do Beta
      const res = await req.get(`${BASE_URL}/${TEST_USERS.betaAdmin.idUser}`);

      expect(res.statusCode).toBe(404);
    });
  });

  // ============================================
  // PUT /api/v1/user/me
  // ============================================
  describe("PUT /me", () => {
    it("should return 401 for unauthenticated request", async () => {
      const res = await request(app).put(`${BASE_URL}/me`).send({
        username: "newname",
      });

      expect(res.statusCode).toBe(401);
    });

    it("should return 200 and update username", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaMember.email,
        TEST_USERS.alphaMember.password,
      );
      const req = authenticatedRequest(cookies);

      const newUsername = `updated_${Date.now()}`;
      const res = await req.put(`${BASE_URL}/me`).send({
        username: newUsername,
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.username).toBe(newUsername);
    });

    it("should return 200 and update fullName", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaMember.email,
        TEST_USERS.alphaMember.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.put(`${BASE_URL}/me`).send({
        fullName: "Test Full Name",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.fullName).toBe("Test Full Name");
    });

    it("should return 200 and update phone", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaMember.email,
        TEST_USERS.alphaMember.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.put(`${BASE_URL}/me`).send({
        phone: "11999999999",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.phone).toBe("11999999999");
    });

    it("should return 400 for invalid email format", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaMember.email,
        TEST_USERS.alphaMember.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.put(`${BASE_URL}/me`).send({
        email: "invalid-email",
      });

      expect(res.statusCode).toBe(400);
    });

    it("should return 400 for weak password", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaMember.email,
        TEST_USERS.alphaMember.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.put(`${BASE_URL}/me`).send({
        password: "weak",
      });

      expect(res.statusCode).toBe(400);
    });
  });

  // ============================================
  // PUT /api/v1/user/:idUser
  // ============================================
  describe("PUT /:idUser", () => {
    it("should return 401 for unauthenticated request", async () => {
      const res = await request(app)
        .put(`${BASE_URL}/${TEST_USERS.alphaMember.idUser}`)
        .send({
          username: "newname",
        });

      expect(res.statusCode).toBe(401);
    });

    it("should return 403 for member trying to update another user", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaMember.email,
        TEST_USERS.alphaMember.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req
        .put(`${BASE_URL}/${TEST_USERS.alphaManager.idUser}`)
        .send({
          username: "newname",
        });

      expect(res.statusCode).toBe(403);
    });

    it("should return 204 for manager updating user in same BrandMaster", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaManager.email,
        TEST_USERS.alphaManager.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req
        .put(`${BASE_URL}/${TEST_USERS.alphaMember.idUser}`)
        .send({
          username: `manager_updated_${Date.now()}`,
        });

      expect(res.statusCode).toBe(204);
    });

    it("should return 204 for admin updating user in same BrandMaster", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaAdmin.email,
        TEST_USERS.alphaAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req
        .put(`${BASE_URL}/${TEST_USERS.alphaMember.idUser}`)
        .send({
          username: `admin_updated_${Date.now()}`,
        });

      expect(res.statusCode).toBe(204);
    });

    it("should return 404 for manager trying to update user from another BrandMaster", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaManager.email,
        TEST_USERS.alphaManager.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req
        .put(`${BASE_URL}/${TEST_USERS.betaMember.idUser}`)
        .send({
          username: "newname",
        });

      expect(res.statusCode).toBe(404);
    });

    it("should allow Vituax admin to update any user", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req
        .put(`${BASE_URL}/${TEST_USERS.alphaMember.idUser}`)
        .send({
          username: `vituax_updated_${Date.now()}`,
        });

      expect(res.statusCode).toBe(204);
    });

    it("should return 204 when updating role", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaAdmin.email,
        TEST_USERS.alphaAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req
        .put(`${BASE_URL}/${TEST_USERS.alphaMember.idUser}`)
        .send({
          role: "manager",
        });

      expect(res.statusCode).toBe(204);
    });

    it("should return 204 when updating isActive", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaAdmin.email,
        TEST_USERS.alphaAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req
        .put(`${BASE_URL}/${TEST_USERS.alphaMember.idUser}`)
        .send({
          isActive: false,
        });

      expect(res.statusCode).toBe(204);
    });
  });

  // ============================================
  // DELETE /api/v1/user/:idUser
  // ============================================
  describe("DELETE /:idUser", () => {
    let userToDeleteId: string;

    beforeEach(async () => {
      // Cria um usuário para deletar em cada teste
      const uniqueEmail = generateUniqueEmail();
      const uniqueUsername = generateUniqueUsername();

      const res = await request(app).post(`${BASE_URL}/register`).send({
        email: uniqueEmail,
        username: uniqueUsername,
        password: "Test@123456",
      });

      userToDeleteId = res.body.idUser;
    });

    it("should return 401 for unauthenticated request", async () => {
      const res = await request(app).delete(`${BASE_URL}/${userToDeleteId}`);

      expect(res.statusCode).toBe(401);
    });

    it("should return 403 for member trying to delete user", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxMember.email,
        TEST_USERS.vituaxMember.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.delete(`${BASE_URL}/${userToDeleteId}`);

      expect(res.statusCode).toBe(403);
    });

    it("should return 403 for manager trying to delete user", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxManager.email,
        TEST_USERS.vituaxManager.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.delete(`${BASE_URL}/${userToDeleteId}`);

      expect(res.statusCode).toBe(403);
    });

    it("should return 204 for admin deleting user", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.delete(`${BASE_URL}/${userToDeleteId}`);

      expect(res.statusCode).toBe(204);
    });

    it("should return 404 for non-existent user", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.delete(
        `${BASE_URL}/550e8400-e29b-41d4-a716-999999999999`,
      );

      expect(res.statusCode).toBe(404);
    });

    it("should return 400 for invalid UUID format", async () => {
      const cookies = await loginAs(
        TEST_USERS.vituaxAdmin.email,
        TEST_USERS.vituaxAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      const res = await req.delete(`${BASE_URL}/invalid-uuid`);

      expect(res.statusCode).toBe(400);
    });

    it("should return 404 when BrandMaster admin tries to delete user from another BrandMaster", async () => {
      const cookies = await loginAs(
        TEST_USERS.alphaAdmin.email,
        TEST_USERS.alphaAdmin.password,
      );
      const req = authenticatedRequest(cookies);

      // Cria usuário no Beta e tenta deletar como Alpha admin
      const uniqueEmail = generateUniqueEmail();
      const createRes = await request(app).post(`${BASE_URL}/register`).send({
        email: uniqueEmail,
        username: generateUniqueUsername(),
        password: "Test@123456",
      });

      // O usuário foi criado sem BrandMaster, então Alpha admin não tem acesso
      const res = await req.delete(`${BASE_URL}/${createRes.body.idUser}`);

      expect(res.statusCode).toBe(404);
    });
  });
});
