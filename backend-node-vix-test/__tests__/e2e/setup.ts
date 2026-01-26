import { execSync } from "child_process";
import path from "path";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

// Carrega variáveis de ambiente do .env.test ANTES de qualquer import do Prisma
dotenv.config({ path: path.resolve(__dirname, "../../.env.test") });

// Força o DATABASE_URL para o banco de testes
process.env.DATABASE_URL =
  "mysql://root:password@localhost:3312/test-cloud-db-e2e";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Cria o banco de dados se não existir
async function createDatabaseIfNotExists() {
  const connection = await mysql.createConnection({
    host: "localhost",
    port: 3312,
    user: "root",
    password: "password",
  });

  await connection.query(
    "CREATE DATABASE IF NOT EXISTS `test-cloud-db-e2e`",
  );
  await connection.end();
}

// Limpa todas as tabelas e re-executa o seed
async function resetDatabase() {
  // Limpa as tabelas na ordem correta (respeitando foreign keys)
  await prisma.vM.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.brandMaster.deleteMany({});

  // Re-executa o seed
  execSync("npx prisma db seed", {
    cwd: path.resolve(__dirname, "../.."),
    env: { ...process.env },
    stdio: "pipe",
  });
}

// Executa antes de todos os testes
beforeAll(async () => {
  console.log("\n🔧 Setting up E2E test database...");
  console.log("📦 DATABASE_URL:", process.env.DATABASE_URL);

  try {
    // Cria o banco de dados se não existir
    console.log("🗄️  Creating database if not exists...");
    await createDatabaseIfNotExists();

    // Cria o banco de dados se não existir e roda as migrations
    console.log("🗄️  Running migrations...");
    execSync("npx prisma migrate deploy", {
      cwd: path.resolve(__dirname, "../.."),
      env: { ...process.env },
      stdio: "pipe",
    });

    // Roda o seed
    console.log("🌱 Running seed...");
    execSync("npx prisma db seed", {
      cwd: path.resolve(__dirname, "../.."),
      env: { ...process.env },
      stdio: "pipe",
    });

    console.log("✅ E2E database setup complete!\n");
  } catch (error) {
    console.error("❌ Error setting up E2E database:", error);
    throw error;
  }
}, 60000); // 60 segundos de timeout para setup

// Executa depois de todos os testes
afterAll(async () => {
  await prisma.$disconnect();
});

// Exporta o prisma client e função de reset para uso nos testes
export { prisma, resetDatabase };
