/*
  Warnings:

  - You are about to drop the column `nickName` on the `friend` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `friend` DROP COLUMN `nickName`,
    ADD COLUMN `nickname1` VARCHAR(191) NULL,
    ADD COLUMN `nickname2` VARCHAR(191) NULL;
