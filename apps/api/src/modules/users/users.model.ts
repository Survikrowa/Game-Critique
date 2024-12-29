import { AggregateRoot } from '@nestjs/cqrs';

export class User extends AggregateRoot {
  constructor(private readonly id: string) {
    super();
  }
}
