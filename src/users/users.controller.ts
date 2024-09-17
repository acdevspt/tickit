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
import { UserDto } from './dto/users.dto';
import { UsersService } from './users.service';
import { AccessTokenGuard } from 'src/auth/common/guard';
import { GetCurrentCredentialId } from 'src/auth/common/decorators/get-current-credential-id.decorator';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  // create a new user
  @UseGuards(AccessTokenGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addDepartment(@GetCurrentCredentialId() tokenUserId: string, @Body() dto: UserDto) {
    return await this.userService.addUser(dto);
  }

  // get all users
  @UseGuards(AccessTokenGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllDepartments(@GetCurrentCredentialId() tokenUserId: string) {
    return await this.userService.getAllUsers();
  }

  // get users of specific department
  @UseGuards(AccessTokenGuard)
  @Get('/department/:department_uuid')
  @HttpCode(HttpStatus.OK)
  async getDepartmentUsers(@GetCurrentCredentialId() tokenUserId: string, @Param('department_uuid') departmentUuid: string) {
    return await this.userService.getDepartmentUsers(departmentUuid);
  }

  // delete a specific user
  @UseGuards(AccessTokenGuard)
  @Delete('/:user_uuid')
  @HttpCode(HttpStatus.OK)
  async deleteDepartment(@GetCurrentCredentialId() tokenUserId: string, @Param('user_uuid') userUuid: string) {
    return await this.userService.deleteUser(userUuid);
  }

  // update a department of a user (PATCH)
  @UseGuards(AccessTokenGuard)
  @Patch('/department/:user_uuid')
  @HttpCode(HttpStatus.OK)
  async updateDepartmentAbreviation(
    @GetCurrentCredentialId() tokenUserId: string,
    @Param('user_uuid') userUuid: string,
    @Body() data: string,
  ) {
    return await this.userService.updateUserDepartment(
      userUuid,
      data['department_uuid'],
    );
  }
}
