import { Injectable, UseGuards } from '@nestjs/common';
import { Query } from '@nestjs/graphql';
import { RoleDTO } from './roles.dto';
import { RolesService } from './roles.service';
import { JwtAuthGuard } from '../auth/guards/auth-jwt.guard';
import { AdminUserGuard } from '../auth/guards/admin-user.guard';

@Injectable()
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}
  // @UseGuards(JwtAuthGuard, AdminUserGuard)
  @Query(() => [RoleDTO])
  async roles(): Promise<RoleDTO[]> {
    return this.rolesService.getRoles();
  }
}
