/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `brandMaster` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `brandMaster_cnpj_key` ON `brandMaster`(`cnpj`);
