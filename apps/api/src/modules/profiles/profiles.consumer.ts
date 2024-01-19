import { Process, Processor } from '@nestjs/bull';
import { ProfilesRepository } from './profiles.repository';
import { Job } from 'bull';

@Processor('user_created')
export class ProfilesConsumer {
  constructor(private readonly profilesRepository: ProfilesRepository) {}

  @Process('userCreated')
  async userCreated(job: Job<{ userId: number; username: string }>) {
    await this.profilesRepository.createProfile(
      job.data.userId,
      job.data.username,
    );
  }
}
