import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TicketsService],
  exports: [TicketsService]
})
export class TicketsModule {}
