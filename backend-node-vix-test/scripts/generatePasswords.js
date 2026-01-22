const bcrypt = require('bcrypt');

async function generatePasswordHashes() {
  const passwords = [
    { role: 'admin', password: 'Admin@123' },
    { role: 'manager', password: 'Manager@123' },
    { role: 'member', password: 'Member@123' }
  ];

  console.log('Gerando hashes de senhas...\n');

  for (const user of passwords) {
    const hash = await bcrypt.hash(user.password, 10);
    console.log(`${user.role.toUpperCase()}:`);
    console.log(`  Senha: ${user.password}`);
    console.log(`  Hash: ${hash}\n`);
  }
}

generatePasswordHashes();
