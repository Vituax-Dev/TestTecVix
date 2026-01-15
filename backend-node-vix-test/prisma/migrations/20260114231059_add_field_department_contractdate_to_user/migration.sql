-- AlterTable
ALTER TABLE `user` ADD COLUMN `contractDate` DATETIME(0) NULL,
    ADD COLUMN `department` VARCHAR(191) NULL,
    ADD COLUMN `field` VARCHAR(191) NULL;
