import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { OAuthTokenDto } from './igdb.dto';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class IgdbService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}
  async getTokenFromOAuth(): Promise<OAuthTokenDto> {
    const { data } = await firstValueFrom<AxiosResponse<OAuthTokenDto>>(
      this.httpService.post(
        '/token',
        {
          client_id: this.configService.get('IGDB_CLIENT_ID'),
          client_secret: this.configService.get('IGDB_CLIENT_SECRET'),
          grant_type: 'client_credentials',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    );
    if (data.access_token) {
      const token = await this.getTokenFromDatabase();
      if (token) {
        await this.updateTokenInDatabase(data.access_token);
      } else {
        await this.saveTokenToDatabase(data.access_token);
      }
    }
    return data;
  }

  async updateTokenInDatabase(
    token: OAuthTokenDto['access_token'],
  ): Promise<void> {
    await this.prismaService.iGBDBAuth.update({
      where: {
        id: 1,
      },
      data: {
        token,
      },
    });
  }

  async getTokenFromDatabase(): Promise<OAuthTokenDto['access_token'] | null> {
    const data = await this.prismaService.iGBDBAuth.findFirst();
    if (!data) {
      return null;
    }
    return data.token;
  }

  async saveTokenToDatabase(
    token: OAuthTokenDto['access_token'],
  ): Promise<void> {
    await this.prismaService.iGBDBAuth.create({
      data: {
        token,
      },
    });
  }
}
