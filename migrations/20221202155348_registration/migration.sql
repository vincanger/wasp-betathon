-- CreateTable
CREATE TABLE "Registration" (
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "Registration_name_key" ON "Registration"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Registration_email_key" ON "Registration"("email");
