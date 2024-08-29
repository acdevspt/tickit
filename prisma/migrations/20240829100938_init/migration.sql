-- CreateTable
CREATE TABLE "Departments" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "abreviation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Departments_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Users" (
    "uuid" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "departmentUuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Tickets" (
    "id" TEXT NOT NULL,
    "userUuid" TEXT NOT NULL,
    "departmentUuid" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Departments_name_key" ON "Departments"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Departments_abreviation_key" ON "Departments"("abreviation");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_departmentUuid_fkey" FOREIGN KEY ("departmentUuid") REFERENCES "Departments"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "Users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_departmentUuid_fkey" FOREIGN KEY ("departmentUuid") REFERENCES "Departments"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
