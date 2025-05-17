import { Command } from '@nestjs/cqrs';

export class UpdatePlatformCommand extends Command<UpdatePlatformCommandResponse> {
  constructor(public readonly platform: Partial<PlatformCommandArgs>) {
    super();
  }
}

export type UpdatePlatformCommandResponse = {
  id: number;
  name: string;
  slug: string;
  displayName?: string | null;
};

type PlatformCommandArgs = {
  id: number;
  name: string;
  slug: string;
  displayName?: string | null;
};
