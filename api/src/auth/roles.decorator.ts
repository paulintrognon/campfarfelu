import { CustomDecorator, SetMetadata } from '@nestjs/common'

import { UserRole } from '.prisma/client'

export const ROLES_KEY = 'roles'

/**
 * Roles decorator
 */
export function Roles(...roles: UserRole[]): CustomDecorator<string> {
  return SetMetadata(ROLES_KEY, roles)
}
