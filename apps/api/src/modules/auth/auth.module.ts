import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { OAuthJwtStrategy } from './strategies/o-auth-jwt-strategy.service';
import { AuthResolver } from './auth.resolver';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { DatabaseModule } from '../database/database.module';
import { BullModule } from '@nestjs/bull';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    BullModule.registerQueue({ name: 'user_created' }),
    ConfigModule,
    DatabaseModule,
    HttpModule.register({
      baseURL: process.env.AUTH0_ISSUER_URL,
    }),
  ],
  providers: [OAuthJwtStrategy, AuthResolver, AuthService, AuthRepository],
  exports: [PassportModule],
})
export class AuthModule {}
