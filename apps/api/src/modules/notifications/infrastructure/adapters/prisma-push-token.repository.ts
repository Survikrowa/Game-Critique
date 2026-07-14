import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { PushTokenRepositoryPort } from '../../domain/ports/push-token.repository.port';
import { PushToken } from '../../domain/models/push-token.model';

@Injectable()
export class PrismaPushTokenRepository implements PushTokenRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async save(pushToken: PushToken): Promise<PushToken> {
    const saved = await this.prisma.pushToken.create({
      data: {
        oauthId: pushToken.oauthId,
        token: pushToken.token,
        platform: pushToken.platform,
      },
    });
    return PushToken.create({
      oauthId: saved.oauthId,
      token: saved.token,
      platform: saved.platform,
    });
  }

  async findByOauthId(oauthId: string): Promise<PushToken[]> {
    const tokens = await this.prisma.pushToken.findMany({
      where: { oauthId },
    });
    return tokens.map((t) =>
      PushToken.create({
        oauthId: t.oauthId,
        token: t.token,
        platform: t.platform,
      }),
    );
  }

  async findByToken(token: string): Promise<PushToken | null> {
    const found = await this.prisma.pushToken.findUnique({
      where: { token },
    });
    if (!found) return null;
    return PushToken.create({
      oauthId: found.oauthId,
      token: found.token,
      platform: found.platform,
    });
  }

  async deleteByToken(token: string): Promise<void> {
    await this.prisma.pushToken.delete({ where: { token } });
  }
}
