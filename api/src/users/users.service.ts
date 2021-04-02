import { Injectable } from '@nestjs/common'

export type UserType = {
  id: number
  email: string
  password: string
}

@Injectable()
export class UsersService {
  private readonly users: UserType[] = [
    {
      id: 1,
      email: 'admin@campfarfelu.fr',
      password: 'admin',
    },
  ]

  async findByEmail(email: string): Promise<UserType | undefined> {
    return this.users.find((user) => user.email === email)
  }
}
