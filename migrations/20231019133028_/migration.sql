-- CreateTable
CREATE TABLE "Registration" (
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Submission" (
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "github" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "twitter" TEXT,
    "country" TEXT,
    "website" TEXT,
    "image" TEXT,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "noticeSent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("email")
);

-- CreateIndex
CREATE UNIQUE INDEX "Registration_email_key" ON "Registration"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Submission_email_key" ON "Submission"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Submission_name_key" ON "Submission"("name");
