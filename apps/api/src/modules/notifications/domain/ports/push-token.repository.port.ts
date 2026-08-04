import { RepositoryPort } from '../../../../libs/ddd/repository.port';
import { PushToken } from '../models/push-token.model';

export const PUSH_TOKEN_REPOSITORY = Symbol('PUSH_TOKEN_REPOSITORY');

export interface PushTokenRepositoryPort extends RepositoryPort<PushToken> {
  findByOauthId(oauthId: string): Promise<PushToken[]>;
  findByToken(token: string): Promise<PushToken | null>;
  deleteByToken(token: string): Promise<void>;
}
