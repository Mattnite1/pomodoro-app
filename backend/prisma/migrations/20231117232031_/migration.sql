/*
  Warnings:

  - The primary key for the `tasks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_pkey",
DROP COLUMN "id",
ADD COLUMN     "taskId" SERIAL NOT NULL,
ADD CONSTRAINT "tasks_pkey" PRIMARY KEY ("taskId");
