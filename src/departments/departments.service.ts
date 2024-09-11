import { Injectable } from '@nestjs/common';
import { DepartmentDto } from './dto/departments.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DepartmentsService {
  constructor(private prisma: PrismaService) {}
  // create a new department
  async addDepartment(dto: DepartmentDto) {
    return await this.prisma.departments.create({
      data: dto
    })
  }

  // get all departments
  async getAllDepartments() {
    return await this.prisma.departments.findMany();
  }

  // get name of specific abreviation
  async getNameOfAbreviation(departmentUuid: string) {
    return 0;
  }

  // delete a specific department
  async deleteDepartment(departmentUuid: string) {
    return 0;
  }

  // update a department abreviation (PATCH)
  async updateDepartmentAbreviation(departmentUuid: string, abv: string) {
    return 0;
  }

  // update a department name (PATCH)
  async updateDepartmentName(departmentUuid: string, name: string) {
    return 0;
  }
}
