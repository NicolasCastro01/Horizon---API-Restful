-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_battery_surfer" (
    "surfer_number" INTEGER NOT NULL,
    "battery_id" TEXT NOT NULL,

    PRIMARY KEY ("battery_id", "surfer_number"),
    CONSTRAINT "battery_surfer_surfer_number_fkey" FOREIGN KEY ("surfer_number") REFERENCES "surfer" ("number") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "battery_surfer_battery_id_fkey" FOREIGN KEY ("battery_id") REFERENCES "battery" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_battery_surfer" ("battery_id", "surfer_number") SELECT "battery_id", "surfer_number" FROM "battery_surfer";
DROP TABLE "battery_surfer";
ALTER TABLE "new_battery_surfer" RENAME TO "battery_surfer";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
