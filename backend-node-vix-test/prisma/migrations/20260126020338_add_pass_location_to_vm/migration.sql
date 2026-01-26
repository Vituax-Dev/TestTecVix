-- AlterTable
ALTER TABLE `vM` ADD COLUMN `location` ENUM('bre_barueri', 'usa_miami') NULL DEFAULT 'bre_barueri',
    ADD COLUMN `pass` VARCHAR(191) NULL;
