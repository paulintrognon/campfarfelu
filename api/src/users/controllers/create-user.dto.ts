import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator'

import { UserRole } from '.prisma/client'

export class CreateUserDto {
  @IsEmail()
  email!: string

  @IsNotEmpty()
  name!: string

  @IsNotEmpty()
  password!: string

  @IsNotEmpty()
  @IsEnum(UserRole)
  @ApiProperty({ name: 'role', enum: UserRole })
  role!: UserRole
}
