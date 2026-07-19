export const PROFILE_REPOSITORY = Symbol('PROFILE_REPOSITORY');

export type CreateProfileData = {
  userId: number;
  name: string;
  avatarUrl: string;
};

export interface ProfileRepositoryPort {
  createProfile(data: CreateProfileData): Promise<void>;
}
