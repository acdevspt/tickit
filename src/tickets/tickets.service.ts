import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TicketDto } from './dto/TicketDto';

@Injectable()
export class TicketsService {
    constructor(private prisma: PrismaService) {}

    // add a new ticket
    async addTicket(ticket: TicketDto) {
        return ""
    }

    // edit a ticket
    async editTicket(ticket: TicketDto) {
        return ""
    }

    // remove a ticket
    async removeTicket(ticketUuid: string) {
        return ""
    }

    // set ticket as solved
    async updateTicketStatus(ticketUuid: string, status: string) {
        return ""
    }

    // updates the ticket status (solved or unsolved)
    async getUserTicket(userUuid: string) {
        return ""
    }
}
