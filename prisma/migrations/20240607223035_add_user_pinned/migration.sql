-- AlterTable
ALTER TABLE `friend` ADD COLUMN `user1Pinned` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `user2Pinned` BOOLEAN NOT NULL DEFAULT false;
