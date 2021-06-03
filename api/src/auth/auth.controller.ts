import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { AccessTokenType, RequestContainingUser, UserSessionType } from './auth.types'
import { JwtAuthGuard } from './jwt-auth.guard'
import { LocalAuthGuard } from './local-auth.guard'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * POST /auth/login
   * Authenticates a user
   */
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: RequestContainingUser): Promise<AccessTokenType> {
    return this.authService.login(req.user)
  }

  /**
   * GET /auth/me
   * Return current Authenticated user
   */
  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async me(@Req() req: RequestContainingUser): Promise<UserSessionType> {
    return req.user
  }
}
