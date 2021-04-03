import { Request } from 'express'

export type AccessTokenContentType = {
  userId: number
  email: string
}

export type AccessTokenType = {
  access_token: string
}

export type UserInRequestType = {
  id: number
  email: string
}

export type RequestContainingUser = Request & {
  user: UserInRequestType
}
