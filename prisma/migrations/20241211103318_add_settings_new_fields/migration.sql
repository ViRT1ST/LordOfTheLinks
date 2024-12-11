-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "linksPerPage" INTEGER NOT NULL DEFAULT 10,
    "sortLinksBy" TEXT NOT NULL DEFAULT 'domain-asc',
    "sortLinksByPriorityFirst" BOOLEAN NOT NULL DEFAULT true,
    "theme" TEXT NOT NULL DEFAULT 'light',
    "background" TEXT NOT NULL DEFAULT 'flowers'
);
INSERT INTO "new_Settings" ("id", "sortLinksBy", "sortLinksByPriorityFirst", "theme") SELECT "id", "sortLinksBy", "sortLinksByPriorityFirst", "theme" FROM "Settings";
DROP TABLE "Settings";
ALTER TABLE "new_Settings" RENAME TO "Settings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
