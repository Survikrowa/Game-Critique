import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { UserAuth0InfoDTO } from '../graphql/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    @InjectQueue('user_created') private userCreatedQueue: Queue,
  ) {}

  async addUserCreatedEvent(userId: number, username: string) {
    await this.userCreatedQueue.add('userCreated', { userId, username });
  }

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
