import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { IgdbService } from './igdb.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://id.twitch.tv/oauth2',
    }),
    ConfigModule,
    DatabaseModule,
  ],
  providers: [IgdbService],
  exports: [IgdbService],
})
export class IgdbModule {}
