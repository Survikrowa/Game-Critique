import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    SearchModule,
    GamesModule,
    AuthModule,
    ImagesModule,
    ProfilesModule,
    CollectionsModule,
    GamesStatusModule,
  ],
})
export class AppModule {}
