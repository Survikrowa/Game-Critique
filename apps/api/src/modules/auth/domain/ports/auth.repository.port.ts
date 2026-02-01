import { RepositoryPort } from '../../../../libs/ddd/repository.port';
import { AuthUser } from '../models/auth-user.model';

export const AUTH_REPOSITORY = Symbol('AUTH_REPOSITORY');

export interface AuthRepositoryPort extends RepositoryPort<AuthUser> {
  findUserByOauthId(oauthId: string): Promise<AuthUser | null>;
}
