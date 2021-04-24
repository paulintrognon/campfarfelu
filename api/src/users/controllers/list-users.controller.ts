import { Controller, Get, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { Roles } from '../../auth/roles.decorator'
import { RolesGuard } from '../../auth/roles.guard'
import { UsersService } from '../users.service'
import { User, UserRole } from '.prisma/client'

type ResponseType = Omit<User, 'passwordHash'>[]

@Controller('users')
export class ListUsersController {
  constructor(private usersService: UsersService) {}

  /**
   * GET /users
   * List all users
   */
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async list(): Promise<ResponseType> {
    return this.usersService.usersRepository.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    })
  }
}
