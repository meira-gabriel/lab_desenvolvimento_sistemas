/*
  Warnings:

  - You are about to drop the column `bairro` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `cidade` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `complemento` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `endereco` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `numeroEndereco` on the `Order` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "bairro",
DROP COLUMN "cidade",
DROP COLUMN "complemento",
DROP COLUMN "endereco",
DROP COLUMN "estado",
DROP COLUMN "numeroEndereco",
ADD COLUMN     "customerId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "fullName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "mobile" VARCHAR(255) NOT NULL,
    "document" VARCHAR(255) NOT NULL,
    "zipCode" VARCHAR(255) NOT NULL,
    "street" VARCHAR(255) NOT NULL,
    "number" VARCHAR(255) NOT NULL,
    "complement" VARCHAR(255),
    "neighborhood" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "state" CHAR(2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
