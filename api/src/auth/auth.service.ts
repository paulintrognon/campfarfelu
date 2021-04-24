import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'

import { UsersService } from '../users/users.service'
import { AccessTokenContentType, AccessTokenType, UserSessionType } from './auth.types'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  /**
   * Returns session user data from an email/password combination
   * If the email/password combination does not match any user, returns null
   */
  async getUserFromEmailPasswordCombination(
    email: string,
    password: string
  ): Promise<null | UserSessionType> {
    // We get the user from the given email
    const user = await this.usersService.usersRepository.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        role: true,
        passwordHash: true,
      },
    })

    // No user found in the database: return null
    if (!user) {
      return null
    }

    // We check that the given password matches the user's password
    if (!bcrypt.compareSync(password, user.passwordHash)) {
      return null
    }

    // Return user data that will be used as session data
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    }
  }

  /**
   * Return an access token generated from user's session data
   */
  async login(user: UserSessionType): Promise<AccessTokenType> {
    const payload: AccessTokenContentType = { email: user.email, userId: user.id, role: user.role }
    if (!process.env.API_JWT_SECRET) {
      throw new Error('API_JWT_SECRET env variable is not set')
    }
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.API_JWT_SECRET,
      }),
    }
  }
}
