import { BadRequestException, Injectable } from '@nestjs/common';
import { DepartmentDto } from './dto/departments.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DepartmentsService {
  constructor(private prisma: PrismaService) {}
  // create a new department
  async addDepartment(dto: DepartmentDto) {
    try {
      return await this.prisma.departments.create({
        data: dto,
      });
    } catch {
      throw new BadRequestException();
    }
  }

  // get all departments
  async getAllDepartments() {
    return await this.prisma.departments.findMany();
  }

  // get name of specific abreviation
  async getNameOfAbreviation(abreviation: string) {
    return await this.prisma.departments.findUnique({
      where: {
        abreviation: abreviation,
      },
      select: {
        name: true,
      },
    });
  }

  // delete a specific department
  async deleteDepartment(departmentUuid: string) {
    return await this.prisma.departments.delete({
      where: {
        uuid: departmentUuid,
      },
    });
  }

  // update a department abreviation (PATCH)
  async updateDepartmentAbreviation(departmentUuid: string, abv: string) {
    return await this.prisma.departments.update({
      where: {
        uuid: departmentUuid,
      },
      data: {
        abreviation: abv,
      },
    });
  }

  // update a department name (PATCH)
  async updateDepartmentName(departmentUuid: string, name: string) {
    return await this.prisma.departments.update({
      where: {
        uuid: departmentUuid,
      },
      data: {
        name: name,
      },
    });
  }
}
