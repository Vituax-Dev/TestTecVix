import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkBrand() {
  const brand = await prisma.brandMaster.findUnique({
    where: { idBrandMaster: 4 }
  });
  
  console.log("BrandMaster ID 4:", brand);
  
  if (!brand || !brand.isActive) {
    const fixedBrand = await prisma.brandMaster.upsert({
      where: { idBrandMaster: 4 },
      update: { isActive: true }, 
      create: { 
        idBrandMaster: 4, 
        isActive: true,

        name: "Default Brand" 
      }
    });
    
    console.log("Brand fixed/created:", fixedBrand);
  }
}

checkBrand()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());