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
  constructor(private readonly userService: DepartmentsService) {}
  // create a new department
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addDepartment(@Body() dto: DepartmentDto) {
    return await this.userService.addDepartment(dto);
  }

  // get all departments
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllDepartments() {
    return await this.userService.getAllDepartments();
  }

  // get name of specific abreviation
  @Get('/:abreviation')
  @HttpCode(HttpStatus.OK)
  async getNameOfAbreviation(@Param('abreviation') abreviation: string) {
    return await this.userService.getNameOfAbreviation(abreviation);
  }

  // delete a specific department
  @Delete('/:department_uuid')
  @HttpCode(HttpStatus.OK)
  async deleteDepartment(@Param('department_uuid') departmentUuid: string) {
    return await this.userService.deleteDepartment(departmentUuid);
  }

  // update a department abreviation (PATCH)
  @Patch('/abv/:department_uuid')
  @HttpCode(HttpStatus.OK)
  async updateDepartmentAbreviation(
    @Param('department_uuid') departmentUuid: string,
    @Body() data: string,
  ) {
    return await this.userService.updateDepartmentAbreviation(
      departmentUuid,
      data["abreviation"],
    );
  }

  // update a department name (PATCH)
  @Patch('/name/:department_uuid')
  @HttpCode(HttpStatus.OK)
  async updateDepartmentName(
    @Param('department_uuid') departmentUuid: string,
    @Body() data: string,
  ) {
    return await this.userService.updateDepartmentName(
      departmentUuid,
      data["name"],
    );
  }
}
