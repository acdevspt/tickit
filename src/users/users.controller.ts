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
import { UserDto } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  // create a new user
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addDepartment(@Body() dto: UserDto) {
    return await this.userService.addUser(dto);
  }

  // get all users
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllDepartments() {
    return await this.userService.getAllUsers();
  }

  // get users of specific department
  @Get('/department/:department_uuid')
  @HttpCode(HttpStatus.OK)
  async getDepartmentUsers(@Param('department_uuid') departmentUuid: string) {
    return await this.userService.getDepartmentUsers(departmentUuid);
  }

  // delete a specific user
  @Delete('/:user_uuid')
  @HttpCode(HttpStatus.OK)
  async deleteDepartment(@Param('user_uuid') userUuid: string) {
    return await this.userService.deleteUser(userUuid);
  }

  // update a department of a user (PATCH)
  @Patch('/department/:user_uuid')
  @HttpCode(HttpStatus.OK)
  async updateDepartmentAbreviation(
    @Param('user_uuid') userUuid: string,
    @Body() data: string,
  ) {
    return await this.userService.updateUserDepartment(
      userUuid,
      data['department_uuid'],
    );
  }
}
