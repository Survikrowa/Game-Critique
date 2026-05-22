import { Injectable } from '@nestjs/common';
import { DoesItPlayService } from './doesitplay_scraper.service';

@Injectable()
export class DoesItPlayScraperFacade {
  constructor(private readonly doesItPlayService: DoesItPlayService) {}

  async searchGame(title: string) {
    return this.doesItPlayService.searchGame(title);
  }
}
