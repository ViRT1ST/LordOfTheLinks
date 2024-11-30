-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Link" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "domain" TEXT NOT NULL DEFAULT 'ya.ru',
    "title" TEXT NOT NULL,
    "info" TEXT,
    "priority" INTEGER NOT NULL DEFAULT 10,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Link" ("createdAt", "id", "info", "priority", "title", "updatedAt", "url") SELECT "createdAt", "id", "info", "priority", "title", "updatedAt", "url" FROM "Link";
DROP TABLE "Link";
ALTER TABLE "new_Link" RENAME TO "Link";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
