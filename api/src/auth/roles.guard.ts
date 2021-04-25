import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { ROLES_KEY } from './roles.decorator'
import { UserRole } from '.prisma/client'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  /**
   * Check if the user associated with the request has at least one of required roles to access the resource.
   * If no role is associated to the resource, the access is always granted.
   */
  canActivate(context: ExecutionContext): boolean {
    // Get the required roles for the resource
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    // If no roles are required, the access is granted
    if (!requiredRoles) {
      return true
    }

    // If some roles are required, we get the user in order to check if they have the correct role
    const { user } = context.switchToHttp().getRequest()

    // If there is no user associated with the request, the access is not granted
    if (!user) {
      return false
    }

    // The user need to have at least one of the required role to be granted access
    return requiredRoles.some((role) => user.role === role)
  }
}
