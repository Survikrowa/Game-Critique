import { Injectable } from '@nestjs/common';
import { ProfilesRepository } from './profiles.repository';

@Injectable()
export class ProfilesService {
  constructor(private readonly profilesRepository: ProfilesRepository) {}

  async getProfileInfo(oauthId: string) {
    return this.profilesRepository.getProfileInfo(oauthId);
  }
}
