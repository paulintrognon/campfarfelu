import { Request } from 'express'

import { UserRole } from '.prisma/client'

export type AccessTokenContentType = {
  userId: number
  email: string
  role: UserRole
}

export type AccessTokenType = {
  access_token: string
}

export type UserSessionType = {
  id: number
  email: string
  role: UserRole
}

export type RequestContainingUser = Request & {
  user: UserSessionType
}
