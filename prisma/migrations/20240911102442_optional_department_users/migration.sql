-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_departmentUuid_fkey";

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "departmentUuid" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_departmentUuid_fkey" FOREIGN KEY ("departmentUuid") REFERENCES "Departments"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
