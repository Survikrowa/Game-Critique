import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  createUser(oauthId: string) {
    return this.authRepository.createUser(oauthId);
  }
}
