import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DepartmentDto } from './dto/departments.dto';
import { DepartmentsService } from './departments.service';

@Controller('department')
export class DepartmentsController {
  constructor(private readonly departmentService: DepartmentsService) {}
  // create a new department
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addDepartment(@Body() dto: DepartmentDto) {
    return await this.departmentService.addDepartment(dto);
  }

  // get all departments
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllDepartments() {
    return await this.departmentService.getAllDepartments();
  }

  // get name of specific abreviation
  @Get('/:department_uuid')
  @HttpCode(HttpStatus.OK)
  async getNameOfAbreviation(@Param('department_uuid') departmentUuid: string) {
    return await this.departmentService.getNameOfAbreviation(departmentUuid);
  }

  // delete a specific department
  @Delete('/:department_uuid')
  @HttpCode(HttpStatus.OK)
  async deleteDepartment(@Param('department_uuid') departmentUuid: string) {
    return await this.departmentService.deleteDepartment(departmentUuid);
  }

  // update a department abreviation (PATCH)
  @Patch('/abv/:department_uuid')
  @HttpCode(HttpStatus.OK)
  async updateDepartmentAbreviation(
    @Param('department_uuid') departmentUuid: string,
    @Body() abv: string,
  ) {
    return await this.departmentService.updateDepartmentAbreviation(
      departmentUuid,
      abv,
    );
  }

  // update a department name (PATCH)
  @Patch('/name/:department_uuid')
  @HttpCode(HttpStatus.OK)
  async updateDepartmentName(
    @Param('department_uuid') departmentUuid: string,
    @Body() name: string,
  ) {
    return await this.departmentService.updateDepartmentName(
      departmentUuid,
      name,
    );
  }
}
