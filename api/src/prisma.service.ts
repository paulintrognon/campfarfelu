import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  /**
   * Connect to database on module init
   */
  async onModuleInit(): Promise<void> {
    await this.$connect()
  }

  /**
   * Remove database connection on module destroy
   */
  async onModuleDestroy(): Promise<void> {
    await this.$disconnect()
  }
}
