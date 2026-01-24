-- AlterTable
ALTER TABLE `vM` ADD COLUMN `networkType` ENUM('public', 'private', 'public_private') NOT NULL DEFAULT 'public',
    ADD COLUMN `storageType` ENUM('ssd', 'hd') NOT NULL DEFAULT 'ssd';
