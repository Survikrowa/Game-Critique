import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { UserAuth0InfoDTO } from './auth.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/create_user/create_user.command';
import { GetUserRoleQuery } from './queries/get_user_role/get_user_role.query';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @InjectQueue('user_created') private userCreatedQueue: Queue,
  ) {}

  createUser(oauthId: string) {
    return this.commandBus.execute(new CreateUserCommand(oauthId));
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
    return this.queryBus.execute(new GetUserRoleQuery(oauthId));
  }
}
