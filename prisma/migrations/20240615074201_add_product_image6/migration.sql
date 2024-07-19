/*
  Warnings:

  - You are about to drop the column `ProductImage6` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `ProductImage6`,
    ADD COLUMN `productImage6` VARCHAR(191) NULL;
