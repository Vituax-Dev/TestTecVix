const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  
  const adminPass = await bcrypt.hash('Admin@123', 10);
  const managerPass = await bcrypt.hash('Manager@123', 10);
  const memberPass = await bcrypt.hash('Member@123', 10);

  
  await prisma.user.createMany({
    data: [
      {
        username: 'admin',
        email: 'admin@vituax.com',
        password: adminPass,
        role: 'admin',
      },
      {
        username: 'manager',
        email: 'manager@vituax.com',
        password: managerPass,
        role: 'manager',
      },
      {
        username: 'member',
        email: 'member@vituax.com',
        password: memberPass,
        role: 'member',
      },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Usuários criados com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
