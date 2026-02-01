import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { OAuthJwtStrategy } from './infrastructure/strategies/o-auth-jwt-strategy.service';
import { AuthResolver } from './infrastructure/graphql/auth.resolver';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './infrastructure/services/auth.service';
import { DatabaseModule } from '../database/database.module';
import { BullModule } from '@nestjs/bull';
import { HttpModule } from '@nestjs/axios';
import { CqrsModule } from '@nestjs/cqrs';
import { GetUserRoleQueryHandler } from './application/queries/get_user_role/get_user_role.handler';
import { CreateUserCommandHandler } from './application/commands/create_user/create_user.handler';
import { AUTH_REPOSITORY } from './domain/ports/auth.repository.port';
import { PrismaAuthRepository } from './infrastructure/adapters/prisma-auth.repository';

const handlers = [GetUserRoleQueryHandler, CreateUserCommandHandler];

@Module({
  imports: [
    CqrsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    BullModule.registerQueue({ name: 'user_created' }),
    DatabaseModule,
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>('AUTH0_ISSUER_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    OAuthJwtStrategy,
    AuthResolver,
    AuthService,
    ...handlers,
    {
      provide: AUTH_REPOSITORY,
      useClass: PrismaAuthRepository,
    },
  ],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
