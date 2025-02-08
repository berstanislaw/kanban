/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "deletedAt";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "deletedAt";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "deletedAt";
