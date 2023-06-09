-- CreateTable
CREATE TABLE "surfer" (
    "number" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "battery" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "battery_surfer" (
    "surfer_number" INTEGER NOT NULL,
    "battery_id" TEXT NOT NULL,

    PRIMARY KEY ("battery_id", "surfer_number"),
    CONSTRAINT "battery_surfer_surfer_number_fkey" FOREIGN KEY ("surfer_number") REFERENCES "surfer" ("number") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "battery_surfer_battery_id_fkey" FOREIGN KEY ("battery_id") REFERENCES "battery" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "wave" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "batterySurferBatteryId" TEXT NOT NULL,
    "batterySurferSurferNumber" INTEGER NOT NULL,
    CONSTRAINT "wave_batterySurferBatteryId_batterySurferSurferNumber_fkey" FOREIGN KEY ("batterySurferBatteryId", "batterySurferSurferNumber") REFERENCES "battery_surfer" ("battery_id", "surfer_number") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "score" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "wave_id" TEXT NOT NULL,
    "partial_score_one" REAL NOT NULL,
    "partial_score_two" REAL NOT NULL,
    "partial_score_three" REAL NOT NULL,
    CONSTRAINT "score_wave_id_fkey" FOREIGN KEY ("wave_id") REFERENCES "wave" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "surfer_number_key" ON "surfer"("number");

-- CreateIndex
CREATE UNIQUE INDEX "battery_id_key" ON "battery"("id");

-- CreateIndex
CREATE UNIQUE INDEX "wave_id_key" ON "wave"("id");

-- CreateIndex
CREATE UNIQUE INDEX "score_id_key" ON "score"("id");
