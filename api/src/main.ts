import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

/**
 * Bootstraps the whole API
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())

  if (!process.env.API_PORT) {
    throw new Error('API_PORT env variable is mandatory')
  }

  await app.listen(process.env.API_PORT)
}

bootstrap()
