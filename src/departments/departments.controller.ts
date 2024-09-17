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
  UseGuards,
} from '@nestjs/common';
import { DepartmentDto } from './dto/departments.dto';
import { DepartmentsService } from './departments.service';
import { AccessTokenGuard } from 'src/auth/common/guard';
import { GetCurrentCredentialId } from 'src/auth/common/decorators/get-current-credential-id.decorator';

@Controller('department')
export class DepartmentsController {
  constructor(private readonly userService: DepartmentsService) {}
  // create a new department
  @UseGuards(AccessTokenGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addDepartment(
    @GetCurrentCredentialId() userUuid: string,
    @Body() dto: DepartmentDto,
  ) {
    return await this.userService.addDepartment(dto);
  }

  // get all departments
  @UseGuards(AccessTokenGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllDepartments(@GetCurrentCredentialId() userUuid: string) {
    return await this.userService.getAllDepartments();
  }

  // get name of specific abreviation
  @UseGuards(AccessTokenGuard)
  @Get('/:abreviation')
  @HttpCode(HttpStatus.OK)
  async getNameOfAbreviation(
    @GetCurrentCredentialId() userUuid: string,
    @Param('abreviation') abreviation: string,
  ) {
    return await this.userService.getNameOfAbreviation(abreviation);
  }

  // delete a specific department
  @UseGuards(AccessTokenGuard)
  @Delete('/:department_uuid')
  @HttpCode(HttpStatus.OK)
  async deleteDepartment(
    @GetCurrentCredentialId() userUuid: string,
    @Param('department_uuid') departmentUuid: string,
  ) {
    return await this.userService.deleteDepartment(departmentUuid);
  }

  // update a department abreviation (PATCH)
  @UseGuards(AccessTokenGuard)
  @Patch('/abv/:department_uuid')
  @HttpCode(HttpStatus.OK)
  async updateDepartmentAbreviation(
    @GetCurrentCredentialId() userUuid: string,
    @Param('department_uuid') departmentUuid: string,
    @Body() data: string,
  ) {
    return await this.userService.updateDepartmentAbreviation(
      departmentUuid,
      data['abreviation'],
    );
  }

  // update a department name (PATCH)
  @UseGuards(AccessTokenGuard)
  @Patch('/name/:department_uuid')
  @HttpCode(HttpStatus.OK)
  async updateDepartmentName(
    @GetCurrentCredentialId() userUuid: string,
    @Param('department_uuid') departmentUuid: string,
    @Body() data: string,
  ) {
    return await this.userService.updateDepartmentName(
      departmentUuid,
      data['name'],
    );
  }
}
