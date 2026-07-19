import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { UserAuth0InfoDTO } from '../graphql/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async getUserInfoFromAuth0(accessToken: string): Promise<UserAuth0InfoDTO> {
    const { data } = await firstValueFrom(
      this.httpService.get('/userinfo', {
        headers: {
          Authorization: accessToken,
        },
      }),
    );
    return data;
  }
}
