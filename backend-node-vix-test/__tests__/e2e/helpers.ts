import request from "supertest";
import { app } from "../../src/app";

export const TEST_USERS = {
  // Vituax (sem BrandMaster - idBrandMaster: null)
  vituaxAdmin: {
    idUser: "550e8400-e29b-41d4-a716-446655440000",
    email: "admin@vituax.com",
    password: "Admin@123",
    role: "admin",
    idBrandMaster: null,
  },
  vituaxManager: {
    idUser: "550e8400-e29b-41d4-a716-446655440006",
    email: "manager@vituax.com",
    password: "Manager@123",
    role: "manager",
    idBrandMaster: null,
  },
  vituaxMember: {
    idUser: "550e8400-e29b-41d4-a716-446655440007",
    email: "member@vituax.com",
    password: "Member@123",
    role: "member",
    idBrandMaster: null,
  },

  // Alpha (idBrandMaster: 1)
  alphaAdmin: {
    idUser: "550e8400-e29b-41d4-a716-446655440001",
    email: "admin@alpha.com",
    password: "Admin@123",
    role: "admin",
    idBrandMaster: 1,
  },
  alphaManager: {
    idUser: "550e8400-e29b-41d4-a716-446655440002",
    email: "manager@alpha.com",
    password: "Manager@123",
    role: "manager",
    idBrandMaster: 1,
  },
  alphaMember: {
    idUser: "550e8400-e29b-41d4-a716-446655440003",
    email: "member@alpha.com",
    password: "Member@123",
    role: "member",
    idBrandMaster: 1,
  },

  // Beta (idBrandMaster: 2)
  betaAdmin: {
    idUser: "550e8400-e29b-41d4-a716-446655440004",
    email: "admin@beta.com",
    password: "Admin@123",
    role: "admin",
    idBrandMaster: 2,
  },
  betaManager: {
    idUser: "550e8400-e29b-41d4-a716-446655440005",
    email: "manager@beta.com",
    password: "Manager@123",
    role: "manager",
    idBrandMaster: 2,
  },
  betaMember: {
    idUser: "550e8400-e29b-41d4-a716-446655440008",
    email: "member@beta.com",
    password: "Member@123",
    role: "member",
    idBrandMaster: 2,
  },

  // Usuários especiais para testes
  inactiveUser: {
    idUser: "550e8400-e29b-41d4-a716-446655440009",
    email: "inactive@test.com",
    password: "Admin@123",
    role: "member",
    idBrandMaster: 1,
    isActive: false,
  },
  deletedUser: {
    idUser: "550e8400-e29b-41d4-a716-446655440010",
    email: "deleted@test.com",
    password: "Admin@123",
    role: "member",
    idBrandMaster: 1,
    deletedAt: "2025-01-01T00:00:00.000Z",
  },
};

// BrandMasters de teste (baseado no seed)
export const TEST_BRAND_MASTERS = {
  alpha: {
    idBrandMaster: 1,
    brandName: "UPIX",
    domain: "192.168.0.105:3000",
    cnpj: "00.000.001/0001-22",
  },
  beta: {
    idBrandMaster: 2,
    brandName: "Vituax MSP test",
    domain: "192.168.0.106:3000",
    cnpj: "00.000.000/0001-77",
  },
  deleted: {
    idBrandMaster: 3,
    brandName: "MSP test Deleted",
    cnpj: "00.000.000/0001-88",
  },
};

// VMs de teste (baseado no seed)
export const TEST_VMS = {
  alphaVm1: {
    idVM: 1,
    vmName: "Company Test",
    idBrandMaster: 1,
    status: "RUNNING",
  },
  alphaVmDeleted: {
    idVM: 2,
    vmName: "from UPIX Deleted",
    idBrandMaster: 1,
    status: "STOPPED",
  },
  vituaxVm: {
    idVM: 3,
    vmName: "from VituaX",
    idBrandMaster: null,
    status: "RUNNING",
  },
  betaVmDeleted: {
    idVM: 4,
    vmName: "VM 01 Deleted",
    idBrandMaster: 2,
    status: "STOPPED",
  },
  betaVm: {
    idVM: 5,
    vmName: "VM 02",
    idBrandMaster: 2,
    status: "RUNNING",
  },
};

/**
 * Faz login e retorna o cookie de autenticação
 */
export async function loginAs(
  email: string,
  password: string,
): Promise<string[]> {
  const res = await request(app).post("/api/v1/user/login").send({
    email,
    password,
  });

  if (res.statusCode !== 200) {
    throw new Error(`Login failed: ${res.statusCode} - ${res.text}`);
  }

  // Extrai os cookies da resposta
  const cookies = res.headers["set-cookie"];
  return Array.isArray(cookies) ? cookies : [cookies];
}

/**
 * Helper para fazer requisições autenticadas
 */
export function authenticatedRequest(cookies: string[]) {
  return {
    get: (url: string) => request(app).get(url).set("Cookie", cookies),
    post: (url: string) => request(app).post(url).set("Cookie", cookies),
    put: (url: string) => request(app).put(url).set("Cookie", cookies),
    delete: (url: string) => request(app).delete(url).set("Cookie", cookies),
  };
}

/**
 * Gera um email único para testes de registro
 */
export function generateUniqueEmail(): string {
  return `test_${Date.now()}_${Math.random().toString(36).substring(7)}@test.com`;
}

/**
 * Gera um username único para testes de registro
 */
export function generateUniqueUsername(): string {
  return `test_user_${Date.now()}`;
}
