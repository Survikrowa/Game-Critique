import { Query } from '@nestjs/cqrs';

export class GetAllPlatformsQuery extends Query<
  GetAllPlatformsQueryResponse[]
> {
  constructor() {
    super();
  }
}

type GetAllPlatformsQueryResponse = {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
};
