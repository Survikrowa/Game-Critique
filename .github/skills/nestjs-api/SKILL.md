---
name: nestjs-api
description: NestJS GraphQL API backend using CQRS, Prisma, and Bull queues. Use this skill when working with the API backend in apps/api, creating resolvers, services, commands, queries, or database operations.
license: MIT
---

# NestJS API Backend Skill

## Overview
This skill covers the NestJS GraphQL API backend that serves both web and native clients in the Game Critique project.

## Technology Stack
- **Framework**: NestJS 10.x with TypeScript 5.3.3
- **API**: GraphQL with Apollo Server 4.x (@nestjs/graphql)
- **Database**: PostgreSQL with Prisma 5.6.x ORM
- **Queue System**: Bull with Redis for background jobs
- **Authentication**: JWT with Auth0 OAuth (passport-jwt, jwks-rsa)
- **Compiler**: SWC for fast builds
- **Error Tracking**: Sentry integration
- **Web Scraping**: Puppeteer for data extraction
- **Image Storage**: Cloudinary
- **Validation**: Zod schemas

## Architecture Patterns

### CQRS Pattern
The API uses Command Query Responsibility Segregation:
- **Commands**: Write operations that change state
- **Queries**: Read operations that return data
- **Handlers**: Process commands and queries

```typescript
// Command example
export class UpdateGameDataCommand {
  constructor(public readonly hltbId: number) {}
}

// Command handler
@CommandHandler(UpdateGameDataCommand)
export class UpdateGameDataHandler {
  async execute(command: UpdateGameDataCommand) {
    // Implementation
  }
}

// Query example
export class GetGamesQuery {
  constructor(
    public readonly search: string,
    public readonly take: number,
    public readonly skip: number
  ) {}
}
```

### Module Structure
Each feature follows this structure:
```
modules/
  <feature>/
    commands/              # CQRS commands
      <command_name>/
        <command_name>.command.ts
        <command_name>.handler.ts
    queries/               # CQRS queries
      <query_name>/
        <query_name>.query.ts
        <query_name>.handler.ts
    <feature>.module.ts    # NestJS module
    <feature>.service.ts   # Business logic
    <feature>.resolver.ts  # GraphQL resolver
    <feature>.repository.ts # Data access layer
    <feature>.dto.ts       # DTOs and GraphQL types
    <feature>.consumer.ts  # Bull queue consumer (if needed)
```

### Repository Pattern
Data access is abstracted through repositories:
```typescript
@Injectable()
export class GamesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getGameById(hltbId: number) {
    return this.prisma.game.findUnique({
      where: { hltbId },
      include: {
        cover: true,
        platformForGame: { include: { platform: true } },
        genres: { include: { genre: true } },
        release: true,
        completionTime: true,
      },
    });
  }
}
```

## GraphQL Patterns

### Code-First Approach
Schema is generated from TypeScript decorators:

```typescript
// DTOs with GraphQL decorators
@ObjectType()
export class GameWithAllDataDTO {
  @Field(() => Int)
  hltbId: number;

  @Field()
  title: string;

  @Field(() => [PlatformDTO])
  platforms: PlatformDTO[];
}

@ArgsType()
export class GetPaginatedGamesArgs {
  @Field({ nullable: true })
  search?: string;

  @Field(() => Int, { defaultValue: 10 })
  take: number;

  @Field(() => Int, { defaultValue: 0 })
  skip: number;
}

// Resolver
@Resolver()
export class GamesResolver {
  constructor(private readonly gamesService: GamesService) {}

  @Query(() => GameWithAllDataDTO, { name: 'game' })
  async getGameById(@Args('hltbId') hltbId: number) {
    return this.gamesService.getGameById(hltbId);
  }

  @UseGuards(JwtAuthGuard, AdminUserGuard)
  @Mutation(() => UpdateGameDataDTO, { name: 'updateGameData' })
  async updateGameData(@Args('hltbId') hltbId: number) {
    return this.gamesService.updateGameData(hltbId);
  }
}
```

### Guards for Authorization
```typescript
// JWT Authentication
@UseGuards(JwtAuthGuard)
@Query(() => UserProfile)
async getProfile(@CurrentUser() user: User) {
  return this.profilesService.getProfile(user.oauthId);
}

// Admin-only operations
@UseGuards(JwtAuthGuard, AdminUserGuard)
@Mutation(() => Boolean)
async deleteUser(@Args('userId') userId: number) {
  return this.usersService.deleteUser(userId);
}
```

## Database with Prisma

### Schema Definition
```prisma
model User {
  id                Int                @id @default(autoincrement())
  oauthId           String             @unique @map("oauth_id")
  createdAt         DateTime           @default(now()) @map("created_at")
  updatedAt         DateTime           @updatedAt @map("updated_at")
  profile           Profile?
  GamesStatus       GamesStatus[]
  role              UserRole?

  @@map("users")
}
```

### Migration Workflow
```bash
# 1. Update schema.prisma
# 2. Create migration
yarn prisma-migrate-dev <migration-name>

# 3. Generate client
yarn prisma-generate

# 4. Update repositories and DTOs
```

## Background Jobs with Bull

### Queue Setup
```typescript
// In module
BullModule.registerQueue({
  name: 'games',
}),

// In service
constructor(
  @InjectQueue('games') private gamesQueue: Queue,
) {}

async addGamesToDatabase(games: GameData[]) {
  return this.gamesQueue.add('createGame', games);
}

// Consumer
@Processor('games')
export class GamesConsumer {
  @Process('createGame')
  async handleCreateGame(job: Job<GameData[]>) {
    // Process job
  }
}
```

## Error Handling

Always use proper HTTP exceptions:
```typescript
import { HttpException, HttpStatus } from '@nestjs/common';

if (!game) {
  throw new HttpException(
    {
      status: HttpStatus.NOT_FOUND,
      message: 'Nie znaleziono gry o podanym ID',
    },
    HttpStatus.NOT_FOUND,
  );
}
```

## Key Modules

### Existing Modules
- **auth**: JWT authentication with Auth0
- **games**: Game CRUD operations, IGDB integration
- **search**: Game search functionality
- **profiles**: User profile management
- **collections**: User game collections
- **games_status**: Track user's game progress
- **friends**: Friend system with requests
- **images**: Cloudinary image uploads
- **roles**: User role management (Admin/User)
- **platforms**: Gaming platform data
- **user_stats**: User statistics and analytics
- **howlongtobeat_migration**: Data migration from HowLongToBeat
- **howlongtobeat_parser**: Web scraping with Puppeteer

## Development Commands

```bash
# Development
yarn dev                    # Watch mode
yarn start:debug           # Debug mode

# Building
yarn build                 # Production build with SWC

# Database
yarn start:db              # Start PostgreSQL + Redis with Docker
yarn prisma-generate       # Generate Prisma client
yarn prisma-migrate-dev    # Create new migration
yarn prisma-seed           # Seed database

# Testing
yarn test:implement        # Run unit tests
yarn test:e2e             # Run e2e tests
yarn test:cov             # Coverage report

# Code Quality
yarn lint                  # ESLint
yarn format               # Prettier
```

## Best Practices

1. **Always use CQRS** for complex operations
2. **Use repositories** for all data access
3. **Implement proper guards** for protected routes
4. **Use Zod** for runtime validation when needed
5. **Handle errors** with HttpException
6. **Add logging** with AppLoggerMiddleware context
7. **Use Bull queues** for long-running operations
8. **Keep resolvers thin** - delegate to services
9. **Use transactions** for multi-step database operations
10. **Add tests** for critical business logic

## Adding a New Feature

### Step-by-Step Guide
```bash
# 1. Generate module
nest g module modules/<feature>

# 2. Generate service and resolver
nest g service modules/<feature>
nest g resolver modules/<feature>

# 3. Create repository
# Create <feature>.repository.ts

# 4. Create DTOs with GraphQL decorators
# Create <feature>.dto.ts

# 5. Implement CQRS if needed
mkdir -p src/modules/<feature>/commands
mkdir -p src/modules/<feature>/queries

# 6. Add guards for protected operations

# 7. Register in app.module.ts

# 8. Schema auto-generates on startup
```

## Testing Example

```typescript
describe('GamesService', () => {
  let service: GamesService;
  let repository: GamesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GamesService,
        {
          provide: GamesRepository,
          useValue: {
            getGameById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GamesService>(GamesService);
    repository = module.get<GamesRepository>(GamesRepository);
  });

  it('should return a game by id', async () => {
    const mockGame = { hltbId: 1, title: 'Test Game' };
    jest.spyOn(repository, 'getGameById').mockResolvedValue(mockGame);

    const result = await service.getGameById(1);
    expect(result).toEqual(mockGame);
  });
});
```

## Environment Variables

Required environment variables:
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/game_critique

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Auth0
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_AUDIENCE=your-audience

# External APIs
IGDB_CLIENT_ID=your-client-id
IGDB_CLIENT_SECRET=your-client-secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret

# Sentry
SENTRY_DSN=your-dsn

# App
NODE_ENV=development
PORT=3000
```

## Common Patterns

### Service with CQRS
```typescript
@Injectable()
export class GamesService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async getPaginatedGames(args: GetPaginatedGamesArgs) {
    return this.queryBus.execute(
      new GetGamesQuery(args.search, args.take, args.skip)
    );
  }

  async updateGameData(hltbId: number) {
    return this.commandBus.execute(
      new UpdateGameDataCommand(hltbId)
    );
  }
}
```

### Scheduled Tasks
```typescript
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleDailyTask() {
    // Execute task
  }
}
```
