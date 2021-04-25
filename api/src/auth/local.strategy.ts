import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'

import { AuthService } from './auth.service'
import { UserSessionType } from './auth.types'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' })
  }

  /**
   * Retrieve user session data from a email/password combination
   */
  async validate(email: string, password: string): Promise<UserSessionType> {
    const user = await this.authService.getUserFromEmailPasswordCombination(email, password)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
