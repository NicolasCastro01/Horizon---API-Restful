-- CreateTable
CREATE TABLE `surfer` (
    `number` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `surfer_number_key`(`number`),
    PRIMARY KEY (`number`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `battery` (
    `id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `battery_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `battery_surfer` (
    `surfer_number` INTEGER NOT NULL,
    `battery_id` VARCHAR(191) NOT NULL,

    INDEX `battery_surfer_surfer_number_fkey`(`surfer_number`),
    PRIMARY KEY (`battery_id`, `surfer_number`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wave` (
    `id` VARCHAR(191) NOT NULL,
    `battery_surfer_id` VARCHAR(191) NOT NULL,
    `battery_surfer_number` INTEGER NOT NULL,

    UNIQUE INDEX `wave_id_key`(`id`),
    INDEX `wave_battery_surfer_id_battery_surfer_number_fkey`(`battery_surfer_id`, `battery_surfer_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `score` (
    `id` VARCHAR(191) NOT NULL,
    `wave_id` VARCHAR(191) NOT NULL,
    `partial_score_one` DOUBLE NOT NULL,
    `partial_score_two` DOUBLE NOT NULL,
    `partial_score_three` DOUBLE NOT NULL,

    UNIQUE INDEX `score_id_key`(`id`),
    INDEX `score_wave_id_fkey`(`wave_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `battery_surfer` ADD CONSTRAINT `battery_surfer_battery_id_fkey` FOREIGN KEY (`battery_id`) REFERENCES `battery`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `battery_surfer` ADD CONSTRAINT `battery_surfer_surfer_number_fkey` FOREIGN KEY (`surfer_number`) REFERENCES `surfer`(`number`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wave` ADD CONSTRAINT `wave_battery_surfer_id_battery_surfer_number_fkey` FOREIGN KEY (`battery_surfer_id`, `battery_surfer_number`) REFERENCES `battery_surfer`(`battery_id`, `surfer_number`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `score` ADD CONSTRAINT `score_wave_id_fkey` FOREIGN KEY (`wave_id`) REFERENCES `wave`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
