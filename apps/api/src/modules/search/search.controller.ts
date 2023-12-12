import { Controller, Get } from '@nestjs/common';
import { IgdbService } from '../igdb/igdb.service';

@Controller('search')
export class SearchController {
  constructor(private readonly igdbService: IgdbService) {}
  @Get('/')
  getToken() {
    return this.igdbService.getTokenFromOAuth();
  }
}
