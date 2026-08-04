import { Test, TestingModule } from '@nestjs/testing';
import { RegisterPushTokenHandler } from './register_push_token.handler';
import { RegisterPushTokenCommand } from './register_push_token.command';
import {
  PUSH_TOKEN_REPOSITORY,
  PushTokenRepositoryPort,
} from '../../../domain/ports/push-token.repository.port';
import { PushToken } from '../../../domain/models/push-token.model';

const mockRepository: jest.Mocked<PushTokenRepositoryPort> = {
  save: jest.fn(),
  findByOauthId: jest.fn(),
  findByToken: jest.fn(),
  deleteByToken: jest.fn(),
};

describe('RegisterPushTokenHandler', () => {
  let handler: RegisterPushTokenHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterPushTokenHandler,
        { provide: PUSH_TOKEN_REPOSITORY, useValue: mockRepository },
      ],
    }).compile();

    handler = module.get<RegisterPushTokenHandler>(RegisterPushTokenHandler);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('saves token when it does not exist', async () => {
    mockRepository.findByToken.mockResolvedValue(null);
    mockRepository.save.mockResolvedValue(
      PushToken.create({ oauthId: 'auth0|1', token: 'tok1', platform: 'ios' }),
    );

    const result = await handler.execute(
      new RegisterPushTokenCommand('auth0|1', 'tok1', 'ios'),
    );

    expect(result).toBe(true);
    expect(mockRepository.findByToken).toHaveBeenCalledWith('tok1');
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
  });

  it('skips save when token already exists', async () => {
    mockRepository.findByToken.mockResolvedValue(
      PushToken.create({ oauthId: 'auth0|1', token: 'tok1', platform: 'ios' }),
    );

    const result = await handler.execute(
      new RegisterPushTokenCommand('auth0|1', 'tok1', 'android'),
    );

    expect(result).toBe(true);
    expect(mockRepository.save).not.toHaveBeenCalled();
  });
});
