import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/users.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async addUser(dto: UserDto) {
    return await this.prisma.users.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        departments: { connect: { uuid: dto.departmentUuid } },
      },
    });
  }

  async getAllUsers() {
    return await this.prisma.users.findMany();
  }

  async getDepartmentUsers(departmentUuid: string) {
    return this.prisma.users.findMany({
      where: {
        departmentUuid: departmentUuid,
      },
    });
  }

  async deleteUser(userUuid: string) {
    return await this.prisma.users.delete({
      where: {
        uuid: userUuid,
      },
    });
  }

  async updateUserDepartment(userUuid: string, department: string) {
    return await this.prisma.users.update({
      where: {
        uuid: userUuid,
      },
      data: {
        departmentUuid: department,
      },
    });
  }
}
