/*
  Warnings:

  - Made the column `location` on table `vM` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `vM` MODIFY `location` ENUM('bre_barueri', 'usa_miami') NOT NULL;
