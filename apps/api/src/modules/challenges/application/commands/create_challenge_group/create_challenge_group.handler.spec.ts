import { Test } from '@nestjs/testing';
import { CreateChallengeGroupCommandHandler } from './create_challenge_group.handler';
import { CreateChallengeGroupCommand } from './create_challenge_group.command';
import {
  CHALLENGE_GROUP_REPOSITORY,
  ChallengeGroupRepositoryPort,
} from '../../../domain/ports/challenge-group.repository.port';

const mockGroupRepository: jest.Mocked<ChallengeGroupRepositoryPort> = {
  save: jest.fn(),
  findById: jest.fn(),
  findMineByOwner: jest.fn(),
  findMineByMember: jest.fn(),
  findMember: jest.fn(),
  getActiveMembers: jest.fn(),
  saveMember: jest.fn(),
  acceptInvite: jest.fn(),
  declineInvite: jest.fn(),
  isInvitedFriend: jest.fn(),
};

describe('CreateChallengeGroupCommandHandler', () => {
  let handler: CreateChallengeGroupCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateChallengeGroupCommandHandler,
        { provide: CHALLENGE_GROUP_REPOSITORY, useValue: mockGroupRepository },
      ],
    }).compile();
    handler = moduleRef.get(CreateChallengeGroupCommandHandler);
  });

  beforeEach(() => jest.clearAllMocks());

  it('creates group and saves owner member', async () => {
    mockGroupRepository.save.mockResolvedValue({
      id: 1,
      name: 'Grupa',
      ownerId: 'auth0|1',
    } as never);
    mockGroupRepository.saveMember.mockResolvedValue({} as never);
    mockGroupRepository.findById.mockResolvedValue({
      id: 1,
      name: 'Grupa',
      ownerId: 'auth0|1',
      members: [],
    } as never);

    const result = await handler.execute(
      new CreateChallengeGroupCommand('Grupa', 'auth0|1'),
    );

    expect(result && result.id).toBe(1);
    expect(mockGroupRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Grupa' }),
    );
    expect(mockGroupRepository.saveMember).toHaveBeenCalledTimes(1);
  });
});
