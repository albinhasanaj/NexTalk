-- AlterTable
ALTER TABLE `message` ADD COLUMN `seen` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `seenAt` DATETIME(3) NULL;
