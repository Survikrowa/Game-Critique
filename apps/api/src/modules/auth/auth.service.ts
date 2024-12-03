import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { UserAuth0InfoDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly httpService: HttpService,
    @InjectQueue('user_created') private userCreatedQueue: Queue,
  ) {}

  createUser(oauthId: string) {
    return this.authRepository.createUser(oauthId);
  }

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

  async getUserRole(oauthId: string) {
    return this.authRepository.getUserRole(oauthId);
  }
}
