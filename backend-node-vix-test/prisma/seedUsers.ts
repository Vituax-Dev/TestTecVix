import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
  };

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
      console.log(`User ${userData.email} updated!`);
    } else {
      await prisma.user.create({
        data: userData,
      });
      console.log(`User ${userData.email} created!`);
    }
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
