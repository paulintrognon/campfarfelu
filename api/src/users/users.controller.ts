import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { RequestContainingUser, UserInRequestType } from 'src/auth/auth.types'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('users')
export class UsersController {
  /**
   * GET /me
   * Return current logged user
   */
  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async login(@Req() req: RequestContainingUser): Promise<UserInRequestType> {
    return req.user
  }
}
