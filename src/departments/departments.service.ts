import { Injectable } from '@nestjs/common';
import { DepartmentDto } from './dto/departments.dto';

@Injectable()
export class DepartmentsService {
  // create a new department
  async addDepartment(dto: DepartmentDto) {
    return 0;
  }

  // get all departments
  async getAllDepartments() {
    return 0;
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
