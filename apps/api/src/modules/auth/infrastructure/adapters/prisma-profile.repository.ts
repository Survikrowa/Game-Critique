import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import {
  ProfileRepositoryPort,
  CreateProfileData,
} from '../../domain/ports/profile.repository.port';

@Injectable()
export class PrismaProfileRepository implements ProfileRepositoryPort {
  constructor(private readonly prismaService: PrismaService) {}

  async createProfile(data: CreateProfileData): Promise<void> {
    await this.prismaService.profile.create({
      data: {
        avatarUrl: data.avatarUrl,
        name: data.name.toLowerCase(),
        user: { connect: { id: data.userId } },
      },
    });
  }
}
