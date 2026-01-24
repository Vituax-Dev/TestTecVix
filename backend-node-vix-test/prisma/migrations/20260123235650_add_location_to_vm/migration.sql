/*
  Warnings:

  - Made the column `pass` on table `vM` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `vM` ADD COLUMN `location` ENUM('bre_barueri', 'usa_miami') NULL,
    MODIFY `pass` VARCHAR(191) NOT NULL;
