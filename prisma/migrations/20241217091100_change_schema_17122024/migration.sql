/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Tag` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pinned" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "isTagOnlySearch" BOOLEAN NOT NULL DEFAULT false,
    "info" TEXT,
    "priority" INTEGER NOT NULL DEFAULT 10,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Pinned" ("createdAt", "id", "label", "priority", "query", "updatedAt") SELECT "createdAt", "id", "label", "priority", "query", "updatedAt" FROM "Pinned";
DROP TABLE "Pinned";
ALTER TABLE "new_Pinned" RENAME TO "Pinned";
CREATE TABLE "new_Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL
);
INSERT INTO "new_Tag" ("id", "value") SELECT "id", "value" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
CREATE UNIQUE INDEX "Tag_value_key" ON "Tag"("value");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
