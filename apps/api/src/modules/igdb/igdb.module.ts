import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { IgdbService } from './igdb.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { IgdbAuthModule } from './igdb_auth/igdb_auth.module';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://api.igdb.com/v4/',
    }),
    ConfigModule,
    DatabaseModule,
    IgdbAuthModule,
  ],
  providers: [IgdbService],
  exports: [IgdbService],
})
export class IgdbModule {}
