import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { AccessTokenContentType, UserInRequestType } from './auth.types'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'CHANGE-ME-ONE-DAY',
    })
  }

  validate(payload: AccessTokenContentType): UserInRequestType {
    return { email: payload.email, id: payload.userId }
  }
}
