/*
  Warnings:

  - You are about to drop the column `contractDate` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `contractDate`,
    ADD COLUMN `hiringDate` DATETIME(0) NULL;
