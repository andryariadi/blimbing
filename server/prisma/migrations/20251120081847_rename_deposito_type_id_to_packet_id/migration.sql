/*
  Warnings:

  - You are about to drop the column `depositoTypeId` on the `accounts` table. All the data in the column will be lost.
  - Added the required column `packetId` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_depositoTypeId_fkey";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "depositoTypeId",
ADD COLUMN     "packetId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_packetId_fkey" FOREIGN KEY ("packetId") REFERENCES "deposito_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
