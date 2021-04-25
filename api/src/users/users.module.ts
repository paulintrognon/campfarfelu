import { Module } from '@nestjs/common'

import { PrismaService } from '../prisma.service'
import { CreateUserController } from './controllers/create-user.controller'
import { ListUsersController } from './controllers/list-users.controller'
import { UsersService } from './users.service'

@Module({
  providers: [UsersService, PrismaService],
  controllers: [CreateUserController, ListUsersController],
  exports: [UsersService],
})
export class UsersModule {}
