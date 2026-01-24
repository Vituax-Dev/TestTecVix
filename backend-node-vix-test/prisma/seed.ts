import { Prisma, PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const SEEDS_FOLDER_NAME = ""; // "seeds" folder inside temp folder: ex: "temp/SEEDS_FOLDER_NAME"

async function main() {
  const isDroped = true;
  let limit = 10;

  let tablesTryAgain: Prisma.ModelName[] = [];
  const tables = Object.keys(Prisma.ModelName) as Prisma.ModelName[];
  const MAX = limit;

  const snakeToCamel = (str: string) =>
    str.toLocaleLowerCase().replace(/([-_][a-z0-9])/g, (undeScoreAndString) => {
      return undeScoreAndString.toUpperCase().replace("-", "").replace("_", "");
    });

  const readFile = async (path: string) => {
    try {
      const data = await fs.readFile(
        `./temp/${SEEDS_FOLDER_NAME || "seeds"}/${path}`,
        "utf8",
      );
      const dataParse = JSON.parse(data);
      if (Array.isArray(dataParse)) return dataParse;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      /* empty */
    }
    return [];
  };

  const seedTable = async (table: Prisma.ModelName) => {
    const data = await readFile(`${snakeToCamel(table)}.json`);

    try {
      tablesTryAgain = tablesTryAgain.filter((t) => t !== table);
      // @ts-expect-error ts(2349)
      await prisma[table].createMany({ data });
    } catch (error) {
      if (
        error instanceof Error ||
        error instanceof Prisma.PrismaClientKnownRequestError ||
        error instanceof Prisma.PrismaClientUnknownRequestError ||
        error instanceof Prisma.PrismaClientRustPanicError
      ) {
        if (error.message.toLowerCase().includes("bigint")) {
          try {
            const newData = data.map((item) => {
              return { ...item, sent_timestamp: BigInt(item.sent_timestamp) };
            });
            // @ts-expect-error ts(2349)
            await prisma[table].createMany({
              data: newData,
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (err) {
            /* empty */
          }
        } else if (!error.message.toLowerCase().includes("unique constraint")) {
          tablesTryAgain.push(table);
        }
      }
    }
  };

  const dropAll = async (arrTables = tables) => {
    for (let i = 0; i < arrTables.length; i++) {
      const table = arrTables[i];
      try {
        tablesTryAgain = tablesTryAgain.filter((t) => t !== table);
        // @ts-expect-error ts(2349)
        await prisma[table].deleteMany({});
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        tablesTryAgain.push(table);
      }
    }
  };
  const seedAll = async () => {
    for (let i = 0; i < tables.length; i++) {
      await seedTable(tables[i] as Prisma.ModelName);
    }
  };
  console.clear();
  console.log("----------------------------");

  if (isDroped) {
    await dropAll();
    if (tablesTryAgain.length > 0) {
      while (tablesTryAgain.length > 0 && limit-- > 0) {
        await dropAll(tablesTryAgain);
      }
    }
    console.log(
      "The end",
      tablesTryAgain,
      "<-- Tables to seed (Number of Fails [${tablesTryAgain.length}]) | Number of trys: ",
      MAX - limit,
    );
    console.log("------END---DROP--ALL--XXXXX--------------");
    limit = MAX;
    tablesTryAgain = [];
  }

  console.log("------ Wait for seed all ----------------");
  await seedAll();

  if (tablesTryAgain.length > 0) {
    while (tablesTryAgain.length > 0 && limit-- > 0) {
      await seedAll();
    }
  }

  console.log(
    "The end",
    tablesTryAgain,
    "<-- Tables to seed (Number of Fails [${tablesTryAgain.length}]) | Number of trys: ",
    MAX - limit,
  );

  // Seed test users
  console.log("------ Seeding test users ----------------");
  
  // Vituax users (idBrandMaster: null)
  const vituaxUsers = [
    {
      username: "admin_vituax",
      email: "admin@vituax.com",
      password: await bcrypt.hash("Admin@123", 10),
      role: "admin" as const,
      isActive: true,
      fullName: "Admin Vituax",
      position: "Diretor",
      department: "Diretoria",
      hiringDate: new Date("2024-01-15"),
    },
    {
      username: "manager_vituax",
      email: "manager@vituax.com",
      password: await bcrypt.hash("Manager@123", 10),
      role: "manager" as const,
      isActive: true,
      fullName: "Gerente Vituax",
      position: "Gerente de Projetos",
      department: "Projetos",
      hiringDate: new Date("2024-03-10"),
    },
    {
      username: "member_vituax",
      email: "member@vituax.com",
      password: await bcrypt.hash("Member@123", 10),
      role: "member" as const,
      isActive: true,
      fullName: "Membro Vituax",
      position: "Desenvolvedor",
      department: "Desenvolvimento",
      hiringDate: new Date("2024-06-20"),
    },
  ];

  // UPIX users (idBrandMaster: 1)
  const upixUsers = [
    {
      username: "admin_upix",
      email: "admin@upix.com",
      password: await bcrypt.hash("Admin@123", 10),
      role: "admin" as const,
      isActive: true,
      fullName: "Admin UPIX",
      position: "Diretor Geral",
      department: "Diretoria",
      hiringDate: new Date("2023-08-01"),
      idBrandMaster: 1,
    },
    {
      username: "manager_upix",
      email: "manager@upix.com",
      password: await bcrypt.hash("Manager@123", 10),
      role: "manager" as const,
      isActive: true,
      fullName: "Gerente UPIX",
      position: "Gerente de Operações",
      department: "Operações",
      hiringDate: new Date("2023-11-15"),
      idBrandMaster: 1,
    },
    {
      username: "member_upix",
      email: "member@upix.com",
      password: await bcrypt.hash("Member@123", 10),
      role: "member" as const,
      isActive: true,
      fullName: "Membro UPIX",
      position: "Analista",
      department: "Suporte",
      hiringDate: new Date("2024-02-28"),
      idBrandMaster: 1,
    },
  ];

  // Vituax MSP Test users (idBrandMaster: 2)
  const mspTestUsers = [
    {
      username: "admin_msptest",
      email: "admin@msptest.com",
      password: await bcrypt.hash("Admin@123", 10),
      role: "admin" as const,
      isActive: true,
      fullName: "Admin MSP Test",
      position: "CEO",
      department: "Diretoria",
      hiringDate: new Date("2024-01-01"),
      idBrandMaster: 2,
    },
    {
      username: "manager_msptest",
      email: "manager@msptest.com",
      password: await bcrypt.hash("Manager@123", 10),
      role: "manager" as const,
      isActive: true,
      fullName: "Gerente MSP Test",
      position: "Gerente Técnico",
      department: "TI",
      hiringDate: new Date("2024-04-10"),
      idBrandMaster: 2,
    },
    {
      username: "member_msptest",
      email: "member@msptest.com",
      password: await bcrypt.hash("Member@123", 10),
      role: "member" as const,
      isActive: true,
      fullName: "Membro MSP Test",
      position: "Técnico",
      department: "Suporte Técnico",
      hiringDate: new Date("2024-07-05"),
      idBrandMaster: 2,
    },
  ];

  const allUsers = [...vituaxUsers, ...upixUsers, ...mspTestUsers];

  for (const user of allUsers) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }
  console.log("Test users seeded successfully (9 users: 3 per company)");
}

main()
  .then(async () => {
    console.log("Seeding finished.");
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
