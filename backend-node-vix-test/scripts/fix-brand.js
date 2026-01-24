import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const prisma = new PrismaClient();

async function fixBrands() {
  // 1) Cria BrandMaster "Vituax" se não existir
  let brand = await prisma.brandMaster.findFirst({ 
    where: { brandName: "Vituax" } 
  });
  
  if (!brand) {
    brand = await prisma.brandMaster.create({
      data: {
        brandName: "Vituax",
        isActive: true,
      },
    });
    console.log("Criou BrandMaster:", brand.idBrandMaster);
  } else {
    await prisma.brandMaster.update({
      where: { idBrandMaster: brand.idBrandMaster },
      data: { isActive: true },
    });
    console.log("Ativou BrandMaster existente:", brand.idBrandMaster);
  }

  // 2) Vincula TODOS os 3 usuários a esse Brand
  const users = [
    { email: "admin@vituax.com", password: "Admin@123", username: "admin", role: "admin" },
    { email: "manager@vituax.com", password: "Manager@123", username: "manager", role: "manager" },
    { email: "member@vituax.com", password: "Member@123", username: "member", role: "member" }
  ];
  
  for (const u of users) {
    const hash = await bcrypt.hash(u.password, 10);
    
    // Deleta e recria
    await prisma.user.deleteMany({ where: { email: u.email } });
    await prisma.user.create({
      data: {
        idUser: crypto.randomUUID(),
        email: u.email,
        password: hash,
        username: u.username,
        role: u.role,
        isActive: true,
        idBrandMaster: brand.idBrandMaster,
      },
    });
    console.log(`${u.email} fixado com BrandMaster ${brand.idBrandMaster}`);
  }

  console.log("🎉 USUÁRIOS CORRIGIDOS! Teste login agora.");
}

fixBrands()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
