-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_score" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "wave_id" TEXT NOT NULL,
    "partial_score_one" REAL NOT NULL,
    "partial_score_two" REAL NOT NULL,
    "partial_score_three" REAL NOT NULL,
    CONSTRAINT "score_wave_id_fkey" FOREIGN KEY ("wave_id") REFERENCES "wave" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_score" ("id", "partial_score_one", "partial_score_three", "partial_score_two", "wave_id") SELECT "id", "partial_score_one", "partial_score_three", "partial_score_two", "wave_id" FROM "score";
DROP TABLE "score";
ALTER TABLE "new_score" RENAME TO "score";
CREATE UNIQUE INDEX "score_id_key" ON "score"("id");
CREATE TABLE "new_wave" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "battery_surfer_id" TEXT NOT NULL,
    "battery_surfer_number" INTEGER NOT NULL,
    CONSTRAINT "wave_battery_surfer_id_battery_surfer_number_fkey" FOREIGN KEY ("battery_surfer_id", "battery_surfer_number") REFERENCES "battery_surfer" ("battery_id", "surfer_number") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_wave" ("battery_surfer_id", "battery_surfer_number", "id") SELECT "battery_surfer_id", "battery_surfer_number", "id" FROM "wave";
DROP TABLE "wave";
ALTER TABLE "new_wave" RENAME TO "wave";
CREATE UNIQUE INDEX "wave_id_key" ON "wave"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
