import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'

import { PrismaService } from '../prisma.service'
import { UserRole, User } from '.prisma/client'

@Injectable()
export class UsersService {
  public usersRepository

  constructor(private prisma: PrismaService) {
    this.usersRepository = prisma.user
  }

  /**
   * Create a new user in database with hashed password
   */
  async create(userToCreate: {
    email: string
    name: string
    password: string
    role: UserRole
  }): Promise<User> {
    const { password, ...userWithoutPassword } = userToCreate
    const passwordHash = bcrypt.hashSync(password, 8)
    return this.usersRepository.create({
      data: {
        ...userWithoutPassword,
        passwordHash,
      },
    })
  }
}
