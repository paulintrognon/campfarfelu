import { Body, Controller, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator'

import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { Roles } from '../../auth/roles.decorator'
import { RolesGuard } from '../../auth/roles.guard'
import { UsersService } from '../users.service'
import { User, UserRole } from '.prisma/client'

export class CreateUserDto {
  @IsEmail()
  email!: string

  @IsNotEmpty()
  name!: string

  @IsNotEmpty()
  password!: string

  @IsNotEmpty()
  @IsEnum(UserRole)
  role!: UserRole
}

@Controller('users')
export class CreateUserController {
  constructor(private usersService: UsersService) {}

  /**
   * POST /users
   * Create a new user
   */
  @Post()
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
