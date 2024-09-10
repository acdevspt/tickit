import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super()
        datasources: {
            db: {
                url: "postgresql://admin:randompassword@localhost:5432/ticketdb?schema=public"
            }
        }
    }
    
    async onModuleDestroy() {
        await this.$disconnect
    }

    async onModuleInit() {
        await this.$connect
    }
}