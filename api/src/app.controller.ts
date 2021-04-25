import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  /**
   * GET /
   * Hello world!
   */
  @Get()
  ping(): string {
    return 'Hello world!'
  }
}
