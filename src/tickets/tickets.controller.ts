import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { TicketDto } from './dto/TicketDto';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
    constructor(private ticketService: TicketsService) {}

    // add a new ticket
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async addTicket(@Body() ticket: TicketDto) {
        return ""
    }

    // set user tickets
    @Get()
    async getUserTicket(@Query("user_uuid") userUuid: string) {
        return ""
    }
    
    // edit a ticket
    @Put("/:ticket_uuid")
    async editTicket(@Body() ticket: TicketDto) {
        return ""
    }

    // remove a ticket
    @Delete("/:ticket_uuid")
    async removeTicket(ticketUuid: string) {
        return ""
    }

    // updates the ticket status (solved or unsolved)
    @Patch("/:ticket_uuid/status")
    async updateTicketStatus(
        @Param("ticket_uuid") sneakerUuid: string,
        @Body() body: string
    ) {
        return ""
    }
}
