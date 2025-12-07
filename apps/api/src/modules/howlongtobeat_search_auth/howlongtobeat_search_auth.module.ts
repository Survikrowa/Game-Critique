import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HowLongToBeatSearchAuthService } from './howlongtobeat_search_auth.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>('HLTB_BASE_API_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [HowLongToBeatSearchAuthService],
  exports: [HowLongToBeatSearchAuthService],
})
export class HowLongToBeatSearchAuthModule {}
