-- DropForeignKey
ALTER TABLE "AnimalImage" DROP CONSTRAINT "AnimalImage_adId_fkey";

-- AddForeignKey
ALTER TABLE "AnimalImage" ADD CONSTRAINT "AnimalImage_adId_fkey" FOREIGN KEY ("adId") REFERENCES "AnimalAd"("id") ON DELETE CASCADE ON UPDATE CASCADE;
