import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../../database/database.module';
import { IgdbAuthService } from './igdb_auth.service';
import { IgdbAxiosInterceptor } from './igbd_auth.axios_interceptor';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://id.twitch.tv/oauth2',
    }),
    ConfigModule,
    DatabaseModule,
  ],
  providers: [IgdbAxiosInterceptor, IgdbAuthService],
  exports: [IgdbAuthService],
})
export class IgdbAuthModule {}
