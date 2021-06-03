import { Body, Controller, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { Roles } from '../../auth/roles.decorator'
import { RolesGuard } from '../../auth/roles.guard'
import { UsersService } from '../users.service'
import { CreateUserDto } from './create-user.dto'
import { User, UserRole } from '.prisma/client'

@ApiTags('users')
@Controller()
export class CreateUserController {
  constructor(private usersService: UsersService) {}

  @Post('users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    /**
     * Check if a user with given email does not already exists
     */
    const alreadyExistingUser = await this.usersService.usersRepository.findUnique({
      where: { email: createUserDto.email },
      select: { id: true },
    })
    if (alreadyExistingUser) {
      throw new HttpException(
        { error: `A user with email ${createUserDto.email} already exists.` },
        HttpStatus.BAD_REQUEST
      )
    }

    /**
     * Create and return the user
     */
    return this.usersService.create(createUserDto)
  }
}
