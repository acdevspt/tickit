import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketsController } from './tickets/tickets.controller';
import { TicketsModule } from './tickets/tickets.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [TicketsModule, PrismaModule],
  controllers: [AppController, TicketsController],
  providers: [AppService],
})
export class AppModule {}
