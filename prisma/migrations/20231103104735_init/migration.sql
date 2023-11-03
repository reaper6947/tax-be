-- CreateTable
CREATE TABLE "Tax" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "income" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "tax" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Tax_pkey" PRIMARY KEY ("id")
);
