import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { AppModule } from '../src/app.module'

/**
 * Creates a fake app
 */
export async function createApp(): Promise<INestApplication> {
  console.log('A')
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()
  console.log('B')

  const app = moduleFixture.createNestApplication()
  console.log('C')
  await app.init()
  console.log('D')
  return app
}
