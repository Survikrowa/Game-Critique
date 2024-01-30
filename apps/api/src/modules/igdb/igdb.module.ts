import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { IgdbService } from './igdb.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { IgdbAuthModule } from './igdb_auth/igdb_auth.module';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>('IGDB_BASE_API_URL'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    DatabaseModule,
    IgdbAuthModule,
  ],
  providers: [IgdbService],
  exports: [IgdbService],
})
export class IgdbModule {}
