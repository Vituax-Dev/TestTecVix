/*
  Warnings:

  - You are about to alter the column `location` on the `vM` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `vM` MODIFY `location` VARCHAR(191) NOT NULL DEFAULT 'N/A';
