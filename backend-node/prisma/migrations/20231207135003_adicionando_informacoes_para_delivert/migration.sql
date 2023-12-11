-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('PENDING', 'STARTED', 'FINISHED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "restaurantId" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Restaurante" ADD COLUMN     "lat" VARCHAR(255) NOT NULL DEFAULT '0.0',
ADD COLUMN     "lng" VARCHAR(255) NOT NULL DEFAULT '0.0';

-- CreateTable
CREATE TABLE "Delivery" (
    "id" SERIAL NOT NULL,
    "status" "DeliveryStatus" NOT NULL DEFAULT 'PENDING',
    "lat" VARCHAR(255) NOT NULL,
    "lng" VARCHAR(255) NOT NULL,
    "latDestination" VARCHAR(255) NOT NULL,
    "lngDestination" VARCHAR(255) NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "Delivery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Delivery_orderId_key" ON "Delivery"("orderId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
