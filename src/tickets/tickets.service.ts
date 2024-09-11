import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TicketDto } from './dto/TicketDto';
import { connect } from 'http2';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  // add a new ticket
  async addTicket(dto: TicketDto) {
    return this.prisma.tickets.create({
      data: {
        users: { connect: { uuid: dto.userUuid } },
        departments: { connect: { uuid: dto.departmentUuid } },
        priority: dto.priority,
        title: dto.title,
        description: dto.description,
      },
    });
  }

  // get all tickets
  async getAllTickets() {
    return this.prisma.tickets.findMany();
  }

  // remove a ticket
  async removeTicket(ticketUuid: string) {
    return await this.prisma.tickets.delete({
      where: {
        id: ticketUuid,
      },
    });
  }

  // set ticket as solved
  async updateTicketStatus(ticketUuid: string, status: string) {
    return await this.prisma.tickets.update({
      where: {
        id: ticketUuid,
      },
      data: {
        status: status,
      },
    });
  }

  // get user tickets
  async getUserTicket(userUuid: string) {
    return this.prisma.tickets.findMany({
      where: {
        userUuid: userUuid,
      },
    });
  }

  // get tickets by priority
  async getTicketsByPriority(priority: string) {
    return this.prisma.tickets.findMany({
      where: {
        priority: priority,
      },
    });
  }

  // get user tickets by priority
  async getUserTicketsByPriority(userUuid: string, _priority: string) {
    return this.prisma.tickets.findMany({
      where: {
        userUuid: userUuid,
        priority: _priority,
      },
    });
  }
}
