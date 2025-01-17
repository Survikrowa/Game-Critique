import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HowLongToBeatService } from './howlongtobeat_parser.service';
import { HowLongToBeatScrapperService } from './howlongtobeat_scrapper/howlongtobeat_scrapper.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>('HLTB_BASE_API_URL'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  providers: [HowLongToBeatService, HowLongToBeatScrapperService],
  exports: [HowLongToBeatService],
})
export class HowLongToBeatParserModule {}
