import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SearchModule } from './modules/search/search.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ScheduleModule } from '@nestjs/schedule';
import { GamesModule } from './modules/games/games.module';
import { BullModule } from '@nestjs/bull';
import { AuthModule } from './modules/auth/auth.module';
import { ImagesModule } from './modules/images/images.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { CollectionsModule } from './modules/collections/collections.module';
import { GamesStatusModule } from './modules/games_status/games_status.module';
import { FriendsModule } from './modules/friends/friends.module';
import { HowLongToBeatMigrationModule } from './modules/howlongtobeat_migration/howlongtobeat_migration.module';
import { AppLoggerMiddleware } from './modules/logger/app_logger.middleware';
import {
  GraphqlInterceptor,
  SentryModule,
} from '@travelerdev/nestjs-sentry-graphql';
import * as process from 'process';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RolesModule } from './modules/roles/roles.module';
import { PlatformsModule } from './modules/platforms/platforms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
    }),
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    SentryModule.forRootAsync({
      useFactory: () => ({
        dsn: process.env.SENTRY_DSN,
        debug: true,
        environment: process.env.NODE_ENV || 'development',
        logLevels: ['debug'],
      }),
    }),
    SearchModule,
    GamesModule,
    AuthModule,
    ImagesModule,
    ProfilesModule,
    CollectionsModule,
    GamesStatusModule,
    FriendsModule,
    HowLongToBeatMigrationModule,
    RolesModule,
    PlatformsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useFactory: () => new GraphqlInterceptor(),
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
