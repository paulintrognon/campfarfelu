import { Controller, Post, Req, UseGuards } from '@nestjs/common'

import { AuthService } from './auth.service'
import { AccessTokenType, RequestContainingUser } from './auth.types'
import { LocalAuthGuard } from './local-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * POST /auth/login
   * Authenticates a user.
   */
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: RequestContainingUser): Promise<AccessTokenType> {
    return this.authService.login(req.user)
  }
}
