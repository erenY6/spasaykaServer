-- CreateTable
CREATE TABLE "AnimalAd" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "info1" TEXT,
    "info2" TEXT,
    "description" TEXT,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnimalAd_pkey" PRIMARY KEY ("id")
);
