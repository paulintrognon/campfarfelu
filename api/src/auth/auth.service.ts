import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'

import { AccessTokenContentType, AccessTokenType, UserInRequestType } from './auth.types'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<null | UserInRequestType> {
    const user = await this.usersService.findByEmail(email)

    if (user?.password !== password) {
      return null
    }

    return {
      id: user.id,
      email: user.email,
    }
  }

  async login(user: UserInRequestType): Promise<AccessTokenType> {
    const payload: AccessTokenContentType = { email: user.email, userId: user.id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
