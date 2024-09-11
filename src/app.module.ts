import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketsController } from './tickets/tickets.controller';
import { TicketsModule } from './tickets/tickets.module';
import { PrismaModule } from './prisma/prisma.module';
import { DepartmentsModule } from './departments/departments.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TicketsModule, DepartmentsModule, PrismaModule, UsersModule],
  controllers: [AppController, TicketsController],
  providers: [AppService],
})
export class AppModule {}
