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
} from '@nestjs/common';
import { TicketDto } from './dto/TicketDto';
import { TicketsService } from './tickets.service';

@Controller('ticket')
export class TicketsController {
  constructor(private ticketService: TicketsService) {}

  // add a new ticket
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addTicket(@Body() dto: TicketDto) {
    return this.ticketService.addTicket(dto);
  }

  // get all tickets
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllTickets() {
    return this.ticketService.getAllTickets();
  }

  // get user tickets
  @Get('/filter/?')
  async getUserTicket(
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
  @Delete('/:ticket_uuid')
  @HttpCode(HttpStatus.OK)
  async removeTicket(@Param('ticket_uuid') ticketUuid: string) {
    return await this.ticketService.removeTicket(ticketUuid);
  }

  // updates the ticket status (solved or unsolved)
  @Patch('/:ticket_uuid/status')
  @HttpCode(HttpStatus.OK)
  async updateTicketStatus(
    @Param('ticket_uuid') ticketUuid: string,
    @Body() data: string,
  ) {
    return this.ticketService.updateTicketStatus(ticketUuid, data['status']);
  }
}
