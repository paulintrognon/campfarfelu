import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'

import { createApp } from './create-app'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    console.log('1', app)
    app = await createApp()
    console.log('2', app)
  })

  it('/ (GET)', () => {
    console.log('3')
    return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!')
  })
})
