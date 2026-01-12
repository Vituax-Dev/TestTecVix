import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding users...");

  // Hash das senhas
  const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
  };

  // Criar ou atualizar usuários
  const users = [
    {
      email: "admin@vituax.com",
      username: "admin",
      password: await hashPassword("Admin@123"),
      role: "admin" as const,
    },
    {
      email: "manager@vituax.com",
      username: "manager",
      password: await hashPassword("Manager@123"),
      role: "manager" as const,
    },
    {
      email: "member@vituax.com",
      username: "member",
      password: await hashPassword("Member@123"),
      role: "member" as const,
    },
  ];

  for (const userData of users) {
    const existingUser = await prisma.user.findFirst({
      where: { email: userData.email },
    });

    if (existingUser) {
      await prisma.user.update({
        where: { idUser: existingUser.idUser },
        data: {
          username: userData.username,
          password: userData.password,
          role: userData.role,
          isActive: true,
        },
      });
      console.log(`✅ Usuário ${userData.email} atualizado!`);
    } else {
      await prisma.user.create({
        data: userData,
      });
      console.log(`✅ Usuário ${userData.email} criado!`);
    }
  }

  console.log("🎉 Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro ao fazer seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
