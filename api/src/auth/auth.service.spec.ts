import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'

import { AuthService } from './auth.service'

describe('AuthService', () => {
  let authService: AuthService
  let usersService: UsersService
  let jwtService: JwtService

  beforeEach(async () => {
    usersService = new UsersService()
    jwtService = new JwtService({})
    authService = new AuthService(usersService, jwtService)
  })

  /**
   * validateUser Suite
   */
  describe('validateUser', () => {
    it('should return null if user is not found', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null)
      expect(await authService.validateUser('email@test.com', 'password')).toBe(null)
    })

    it('should return null if the password do not match', async () => {
      jest
        .spyOn(usersService, 'findByEmail')
        .mockResolvedValue({ id: 1, email: 'email@test.com', password: 'wrong' })

      expect(await authService.validateUser('email@test.com', 'password')).toBe(null)
    })

    it('should return the user if the password matches', async () => {
      jest
        .spyOn(usersService, 'findByEmail')
        .mockResolvedValue({ id: 1, email: 'email@test.com', password: 'password' })

      expect(await authService.validateUser('email@test.com', 'password')).toEqual({
        email: 'email@test.com',
        id: 1,
      })
    })
  })

  /**
   * Login Suite
   */
  describe('login', () => {
    it('should generate a JWT from user', async () => {
      const user = { id: 1, email: 'email' }

      const generatedJwt = 'super-generated-jwt'
      jest.spyOn(jwtService, 'sign').mockReturnValue(generatedJwt)

      expect(await authService.login(user)).toEqual({ access_token: 'super-generated-jwt' })
      expect(jwtService.sign).toHaveBeenCalledWith({ email: 'email', userId: 1 })
    })
  })
})
