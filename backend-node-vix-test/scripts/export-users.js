import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";

const prisma = new PrismaClient();

const toCsvValue = (v) => {
  if (v === null || v === undefined) return "";
  const s = String(v);
  const escaped = s.replace(/"/g, '""');
  return /[",\n]/.test(escaped) ? `"${escaped}"` : escaped;
};

async function main() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
    select: {
      email: true,
      profileImgUrl: true,
      role: true,
      idBrandMaster: true,
      isActive: true,
      lastLoginDate: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  });

  const header = [
    "email",
    "profileImgUrl",
    "role",
    "idBrandMaster",
    "isActive",
    "lastLoginDate",
    "createdAt",
    "updatedAt",
    "deletedAt",
  ].join(",");

  const rows = users.map((u) =>
    [
      u.email,
      u.profileImgUrl,
      u.role,
      u.idBrandMaster,
      u.isActive,
      u.lastLoginDate ? u.lastLoginDate.toISOString() : null,
      u.createdAt.toISOString(),
      u.updatedAt.toISOString(),
      u.deletedAt ? u.deletedAt.toISOString() : null,
    ]
      .map(toCsvValue)
      .join(","),
  );

  await writeFile("users.csv", [header, ...rows].join("\n"), "utf8");
  console.log(`OK: users.csv (${users.length} registros)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
