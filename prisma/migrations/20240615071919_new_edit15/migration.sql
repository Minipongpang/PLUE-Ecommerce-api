/*
  Warnings:

  - You are about to alter the column `productType` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(1))`.
  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - Added the required column `gender` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productImage1` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_password_key` ON `User`;

-- DropIndex
DROP INDEX `User_phoneNumber_key` ON `User`;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `ProductImage6` VARCHAR(191) NULL,
    ADD COLUMN `gender` ENUM('MEN', 'WOMEN', 'KIDS') NOT NULL,
    ADD COLUMN `productImage1` VARCHAR(191) NOT NULL,
    ADD COLUMN `productImage2` VARCHAR(191) NULL,
    ADD COLUMN `productImage3` VARCHAR(191) NULL,
    ADD COLUMN `productImage4` VARCHAR(191) NULL,
    ADD COLUMN `productImage5` VARCHAR(191) NULL,
    MODIFY `productType` ENUM('SHIRTS', 'PANTS', 'JACKETS', 'ACCESSORIES') NOT NULL,
    MODIFY `price` DOUBLE NOT NULL DEFAULT 0.0,
    MODIFY `updatedAt` DATETIME(3) NULL;
