-- AlterTable
ALTER TABLE "Delivery" ADD COLUMN     "restaurantId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
