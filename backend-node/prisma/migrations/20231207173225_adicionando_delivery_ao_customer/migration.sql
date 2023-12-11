-- AlterTable
ALTER TABLE "Delivery" ADD COLUMN     "customerId" INTEGER NOT NULL DEFAULT 41;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
