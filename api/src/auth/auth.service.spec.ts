import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'

import { PrismaService } from '../prisma.service'
import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'
import { UserRole } from '.prisma/client'

describe('AuthService', () => {
  let authService: AuthService
  let usersService: UsersService
  let jwtService: JwtService

  beforeEach(async () => {
    usersService = new UsersService(new PrismaService())
    jwtService = new JwtService({})
    authService = new AuthService(usersService, jwtService)
  })

  /**
   * validateUser Suite
   */
  describe('validateUser', () => {
    const user = {
      id: 1,
      email: 'email@test.com',
      name: 'foo',
      role: UserRole.ADMIN,
    }

    it('should return null if user is not found', async () => {
      jest.spyOn(bcrypt, 'compareSync')
      jest.spyOn(usersService.usersRepository, 'findUnique').mockResolvedValue(null)

      expect(
        await authService.getUserFromEmailPasswordCombination('email@test.com', 'password')
      ).toBe(null)

      expect(bcrypt.compareSync).not.toHaveBeenCalled()
    })

    it('should return null if the password do not match', async () => {
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false)
      jest.spyOn(usersService.usersRepository, 'findUnique').mockResolvedValue({
        ...user,
        passwordHash: 'wrong',
      })

      expect(
        await authService.getUserFromEmailPasswordCombination('email@test.com', 'password')
      ).toBe(null)

      expect(bcrypt.compareSync).toHaveBeenCalledWith('password', 'wrong')
    })

    it('should return the user if the password matches', async () => {
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true)
      jest.spyOn(usersService.usersRepository, 'findUnique').mockResolvedValue({
        ...user,
        passwordHash: 'password',
      })

      expect(
        await authService.getUserFromEmailPasswordCombination('email@test.com', 'password')
      ).toEqual({
        id: 1,
        email: 'email@test.com',
        role: UserRole.ADMIN,
      })

      expect(bcrypt.compareSync).toHaveBeenCalledWith('password', 'password')
    })
  })

  /**
   * Login Suite
   */
  describe('login', () => {
    const API_JWT_SECRET = 'API_JWT_SECRET'

    beforeAll(() => {
      process.env.API_JWT_SECRET = API_JWT_SECRET
    })

    it('should generate a JWT from user', async () => {
      const user = { id: 1, email: 'email', role: UserRole.ADMIN }

      const generatedJwt = 'super-generated-jwt'
      jest.spyOn(jwtService, 'sign').mockReturnValue(generatedJwt)

      expect(await authService.login(user)).toEqual({ access_token: 'super-generated-jwt' })
      expect(jwtService.sign).toHaveBeenCalledWith(
        { email: 'email', userId: 1, role: UserRole.ADMIN },
        { secret: API_JWT_SECRET }
      )
    })
  })
})
