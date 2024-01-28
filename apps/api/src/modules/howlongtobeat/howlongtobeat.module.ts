import { Module } from '@nestjs/common';
import { HowLongToBeatController } from './howlongtobeat.controller';
import { HowLongToBeatParserModule } from '../howlongtobeat_parser/howlongtobeat_parser.module';

@Module({
  imports: [HowLongToBeatParserModule],
  controllers: [HowLongToBeatController],
})
export class HowLongToBeatModule {}
