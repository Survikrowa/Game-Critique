import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    @InjectQueue('user_created') private userCreatedQueue: Queue,
  ) {}

  createUser(oauthId: string) {
    return this.authRepository.createUser(oauthId);
  }

  async addUserCreatedEvent(userId: number) {
    await this.userCreatedQueue.add('userCreated', userId);
  }
}
