import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function testLogin() {
  console.log("🔍 Testando credenciais...\n");

  const email = "admin@vituax.com";
  const password = "Admin@123";

  // Buscar usuário
  const user = await prisma.user.findFirst({
    where: { email, deletedAt: null },
  });

  if (!user) {
    console.log("❌ Usuário não encontrado!");
    return;
  }

  console.log("✅ Usuário encontrado:");
  console.log(`   Email: ${user.email}`);
  console.log(`   Username: ${user.username}`);
  console.log(`   Role: ${user.role}`);
  console.log(`   isActive: ${user.isActive}`);
  console.log(`   Password Hash: ${user.password.substring(0, 20)}...`);

  // Testar senha
  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log(`\n🔐 Teste de senha:`);
  console.log(`   Senha testada: ${password}`);
  console.log(`   Resultado: ${isPasswordValid ? "✅ VÁLIDA" : "❌ INVÁLIDA"}`);

  if (!isPasswordValid) {
    console.log("\n🔧 Recriando senha...");
    const newHash = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { idUser: user.idUser },
      data: { password: newHash },
    });
    console.log("✅ Senha atualizada!");

    // Testar novamente
    const user2 = await prisma.user.findFirst({
      where: { email, deletedAt: null },
    });
    const isValid2 = await bcrypt.compare(password, user2!.password);
    console.log(`   Nova validação: ${isValid2 ? "✅ VÁLIDA" : "❌ INVÁLIDA"}`);
  }
}

testLogin()
  .catch((e) => {
    console.error("❌ Erro:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
