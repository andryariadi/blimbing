/*
  Warnings:

  - You are about to drop the column `created_at` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `customer_id` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `deposito_type_id` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `deposito_types` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `deposito_types` table. All the data in the column will be lost.
  - You are about to drop the column `yearly_return` on the `deposito_types` table. All the data in the column will be lost.
  - You are about to drop the column `account_id` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `balance_after` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `balance_before` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `interest_earned` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_date` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `depositoTypeId` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `deposito_types` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearlyReturn` to the `deposito_types` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `balanceAfter` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `balanceBefore` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionDate` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_deposito_type_id_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_account_id_fkey";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "created_at",
DROP COLUMN "customer_id",
DROP COLUMN "deposito_type_id",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customerId" TEXT NOT NULL,
ADD COLUMN     "depositoTypeId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "deposito_types" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
DROP COLUMN "yearly_return",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "yearlyReturn" DECIMAL(5,2) NOT NULL;

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "account_id",
DROP COLUMN "balance_after",
DROP COLUMN "balance_before",
DROP COLUMN "created_at",
DROP COLUMN "interest_earned",
DROP COLUMN "transaction_date",
ADD COLUMN     "accountId" TEXT NOT NULL,
ADD COLUMN     "balanceAfter" DECIMAL(15,2) NOT NULL,
ADD COLUMN     "balanceBefore" DECIMAL(15,2) NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "interestEarned" DECIMAL(15,2) NOT NULL DEFAULT 0,
ADD COLUMN     "transactionDate" DATE NOT NULL;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_depositoTypeId_fkey" FOREIGN KEY ("depositoTypeId") REFERENCES "deposito_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
