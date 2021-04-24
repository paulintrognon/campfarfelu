import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { AccessTokenContentType, UserSessionType } from './auth.types'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    if (!process.env.API_JWT_SECRET) {
      throw new Error('API_JWT_SECRET env variable is not set')
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.API_JWT_SECRET,
    })
  }

  /**
   * Retrieve user session data from a JWT payload
   */
  validate(payload: AccessTokenContentType): UserSessionType {
    return { email: payload.email, id: payload.userId, role: payload.role }
  }
}
