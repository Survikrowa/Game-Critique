import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  AxiosInterceptor,
  AxiosRejectedInterceptor,
} from '@narando/nest-axios-interceptor';
import { isAxiosError } from 'axios';
import { IgdbService } from './igdb.service';

@Injectable()
export class IgdbAxiosInterceptor extends AxiosInterceptor {
  private readonly logger = new Logger(IgdbAxiosInterceptor.name);
  constructor(
    httpService: HttpService,
    private readonly igdbService: IgdbService,
  ) {
    super(httpService);
  }

  protected responseRejected(): AxiosRejectedInterceptor {
    return async (error) => {
      if (isAxiosError(error) && error.response?.status === 401) {
        this.logger.error(error.response.data);
        await this.igdbService.getTokenFromOAuth();
      }
    };
  }
}
