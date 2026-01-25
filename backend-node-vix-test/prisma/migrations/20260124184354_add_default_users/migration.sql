-- Criar usuário admin default (senha: Admin@123)
INSERT INTO `user` (`idUser`, `username`, `password`, `email`, `role`, `isActive`, `createdAt`, `updatedAt`)
VALUES (
  UUID(),
  'admin',
  '$2a$10$aQCrkFBXOywbH3NnV/pMPOIVo35C0e8INFKSWaWBrqjA1UZfdKWpq',
  'admin@vituax.com',
  'admin',
  true,
  NOW(),
  NOW()
);