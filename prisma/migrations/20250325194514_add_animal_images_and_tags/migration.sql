/*
  Warnings:

  - You are about to drop the column `image` on the `AnimalAd` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AnimalAd" DROP COLUMN "image",
ADD COLUMN     "authorId" TEXT,
ADD COLUMN     "fullDesc" TEXT;

-- CreateTable
CREATE TABLE "AnimalImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "adId" TEXT NOT NULL,

    CONSTRAINT "AnimalImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimalTag" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "AnimalTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AdTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AdTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AdTags_B_index" ON "_AdTags"("B");

-- AddForeignKey
ALTER TABLE "AnimalAd" ADD CONSTRAINT "AnimalAd_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimalImage" ADD CONSTRAINT "AnimalImage_adId_fkey" FOREIGN KEY ("adId") REFERENCES "AnimalAd"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdTags" ADD CONSTRAINT "_AdTags_A_fkey" FOREIGN KEY ("A") REFERENCES "AnimalAd"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdTags" ADD CONSTRAINT "_AdTags_B_fkey" FOREIGN KEY ("B") REFERENCES "AnimalTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
