/*
  Warnings:

  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `name`,
    ALTER COLUMN `updateAt` DROP DEFAULT;

-- CreateTable
CREATE TABLE `AccessToken` (
    `id` VARCHAR(191) NOT NULL,
    `value` LONGTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `AccessToken_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Save` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `netWeight` DOUBLE NOT NULL,
    `servingAmount` DOUBLE NOT NULL,
    `servingSize` DOUBLE NOT NULL,
    `energyTotal` INTEGER NOT NULL,
    `energyFat` INTEGER NOT NULL,
    `fatTotal` DOUBLE NOT NULL,
    `saturatedFat` DOUBLE NOT NULL,
    `protein` INTEGER NOT NULL,
    `carbohydrate` INTEGER NOT NULL,
    `sugar` DOUBLE NOT NULL,
    `natrium` INTEGER NOT NULL,
    `fatGrade` VARCHAR(191) NOT NULL,
    `fatLevel` INTEGER NOT NULL,
    `sugarGrade` VARCHAR(191) NOT NULL,
    `sugarLevel` INTEGER NOT NULL,
    `natriumGrade` VARCHAR(191) NOT NULL,
    `natriumLevel` INTEGER NOT NULL,
    `gradeAll` VARCHAR(191) NOT NULL,
    `levelAll` INTEGER NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    INDEX `Product_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductsOnSaves` (
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `saveId` VARCHAR(191) NOT NULL,
    `productId` INTEGER NOT NULL,

    PRIMARY KEY (`saveId`, `productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);

-- CreateIndex
CREATE INDEX `User_email_idx` ON `User`(`email`);

-- AddForeignKey
ALTER TABLE `AccessToken` ADD CONSTRAINT `AccessToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Save` ADD CONSTRAINT `Save_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductsOnSaves` ADD CONSTRAINT `ProductsOnSaves_saveId_fkey` FOREIGN KEY (`saveId`) REFERENCES `Save`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductsOnSaves` ADD CONSTRAINT `ProductsOnSaves_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
