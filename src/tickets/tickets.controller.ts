import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TicketDto } from './dto/TicketDto';
import { TicketsService } from './tickets.service';
import { AccessTokenGuard } from 'src/auth/common/guard';
import { GetCurrentCredentialId } from 'src/auth/common/decorators/get-current-credential-id.decorator';

@Controller('ticket')
export class TicketsController {
  constructor(private ticketService: TicketsService) {}

  // add a new ticket
  @UseGuards(AccessTokenGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addTicket(@GetCurrentCredentialId() tokenUserId: string, @Body() dto: TicketDto) {
    return this.ticketService.addTicket(dto);
  }

  // get all tickets
  @UseGuards(AccessTokenGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllTickets(@GetCurrentCredentialId() tokenUserId: string) {
    return this.ticketService.getAllTickets();
  }

  // get user tickets
  @UseGuards(AccessTokenGuard)
  @Get('/filter/?')
  @UseGuards(AccessTokenGuard)
  async getUserTicket(
    @GetCurrentCredentialId() tokenUserId: string,
    @Query('user_uuid') userUuid: string,
    @Query('priority') priority: string,
  ) {
    if (userUuid && !priority) {
      const user = this.ticketService.getUserTicket(userUuid);
      if ((await user).length != 0) {
        return user;
      } else {
        throw new NotFoundException('User not found!');
      }
    } else if (priority && !userUuid) {
      return this.ticketService.getTicketsByPriority(priority);
    } else if (priority && userUuid) {
      return this.ticketService.getUserTicketsByPriority(userUuid, priority);
    }
  }

  // remove a ticket
  @UseGuards(AccessTokenGuard)
  @Delete('/:ticket_uuid')
  @HttpCode(HttpStatus.OK)
  async removeTicket(@GetCurrentCredentialId() tokenUserId: string, @Param('ticket_uuid') ticketUuid: string) {
    return await this.ticketService.removeTicket(ticketUuid);
  }

  // updates the ticket status (solved or unsolved)
  @UseGuards(AccessTokenGuard)
  @Patch('/:ticket_uuid/status')
  @HttpCode(HttpStatus.OK)
  async updateTicketStatus(
    @GetCurrentCredentialId() tokenUserId: string,
    @Param('ticket_uuid') ticketUuid: string,
    @Body() data: string,
  ) {
    return this.ticketService.updateTicketStatus(ticketUuid, data['status']);
  }
}
