/*
  Warnings:

  - You are about to drop the column `batterySurferBatteryId` on the `wave` table. All the data in the column will be lost.
  - You are about to drop the column `batterySurferSurferNumber` on the `wave` table. All the data in the column will be lost.
  - Added the required column `battery_surfer_id` to the `wave` table without a default value. This is not possible if the table is not empty.
  - Added the required column `battery_surfer_number` to the `wave` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_wave" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "battery_surfer_id" TEXT NOT NULL,
    "battery_surfer_number" INTEGER NOT NULL,
    CONSTRAINT "wave_battery_surfer_id_battery_surfer_number_fkey" FOREIGN KEY ("battery_surfer_id", "battery_surfer_number") REFERENCES "battery_surfer" ("battery_id", "surfer_number") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_wave" ("id") SELECT "id" FROM "wave";
DROP TABLE "wave";
ALTER TABLE "new_wave" RENAME TO "wave";
CREATE UNIQUE INDEX "wave_id_key" ON "wave"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
