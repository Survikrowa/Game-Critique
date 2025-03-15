import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { OAuthJwtStrategy } from './strategies/o-auth-jwt-strategy.service';
import { AuthResolver } from './auth.resolver';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { DatabaseModule } from '../database/database.module';
import { BullModule } from '@nestjs/bull';
import { HttpModule } from '@nestjs/axios';
import { CqrsModule } from '@nestjs/cqrs';
import { GetUserRoleQueryHandler } from './queries/get_user_role/get_user_role.handler';
import { CreateUserCommandHandler } from './commands/create_user/create_user.handler';

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
  providers: [OAuthJwtStrategy, AuthResolver, AuthService, ...handlers],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
