-- AlterTable
ALTER TABLE `vM` ADD COLUMN `networkType` INTEGER NULL DEFAULT 1,
    ADD COLUMN `storageType` ENUM('ssd', 'hd') NULL DEFAULT 'ssd';
