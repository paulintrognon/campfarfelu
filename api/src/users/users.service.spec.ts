import { PrismaService } from '../prisma.service'
import { UsersService } from './users.service'
import { User, UserRole } from '.prisma/client'

describe('UsersService', () => {
  let usersService: UsersService

  beforeEach(() => {
    usersService = new UsersService(new PrismaService())
  })

  /**
   * validateUser Suite
   */
  describe('create', () => {
    it('should create and return the user', async () => {
      const userToCreate = {
        email: 'foo@bar.com',
        name: 'Foo Bar',
        role: UserRole.VISITOR,
        password: 'password',
      }
      const userCreated: User = {
        id: 1,
        email: 'foo@bar.com',
        name: 'Foo Bar',
        role: UserRole.VISITOR,
        passwordHash: 'abc123',
      }
      jest.spyOn(usersService.usersRepository, 'create').mockResolvedValue(userCreated)
      const result = await usersService.create(userToCreate)
      expect(result).toBe(userCreated)
    })
  })
})
