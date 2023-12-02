-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "electronic_devices" (
    "id" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "powerConsumption" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "electronic_devices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "electronic_devices" ADD CONSTRAINT "electronic_devices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
