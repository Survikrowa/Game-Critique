import { Controller, Get } from '@nestjs/common';
import { HowLongToBeatService } from '../howlongtobeat_parser/howlongtobeat_parser.service';

@Controller('howlongtobeat')
export class HowLongToBeatController {
  constructor(private readonly HowLongToBeatParser: HowLongToBeatService) {}

  @Get()
  async getGame() {
    const searchResults = await this.HowLongToBeatParser.search('Persona 5');
    return searchResults;
  }
  @Get('details')
  async getGameDetails() {}
}
