import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from '../../database/database.module';
import { IgdbAuthService } from './igdb_auth.service';
import { IgdbAxiosInterceptor } from './igbd_auth.axios_interceptor';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>('IGDB_AUTH0_BASE_URL'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    DatabaseModule,
  ],
  providers: [IgdbAxiosInterceptor, IgdbAuthService],
  exports: [IgdbAuthService],
})
export class IgdbAuthModule {}
