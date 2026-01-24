---
name: monorepo-structure
description: Turborepo monorepo setup with Yarn workspaces, shared configs, and development workflows. Use this skill when working with monorepo setup, shared packages, workspace dependencies, or build orchestration.
license: MIT
---

# Monorepo Structure Skill

## Overview
This skill covers the monorepo architecture, workspace management, and development workflows for the Game Critique project using Turborepo and Yarn workspaces.

## Monorepo Architecture

### Project Structure
```
Game-Critique/
├── .github/                      # GitHub configs and workflows
│   └── skills/                  # Copilot skills
├── apps/                        # Application workspaces
│   ├── api/                     # NestJS GraphQL API
│   ├── native/                  # Expo React Native app
│   └── web/                     # React admin panel
├── packages/                    # Shared packages
│   └── typescript-config/       # Shared TypeScript configs
├── package.json                 # Root package.json
├── turbo.json                   # Turborepo configuration
├── yarn.lock                    # Yarn lockfile
└── compose.yml                  # Docker Compose setup
```

## Package Manager: Yarn 4.5.3

### Workspace Configuration
```json
// package.json (root)
{
  "private": true,
  "workspaces": [
    "./apps/*",
    "./packages/*"
  ],
  "packageManager": "yarn@4.5.3",
  "engines": {
    "node": ">=18"
  }
}
```

### Yarn Commands
```bash
# Install dependencies for all workspaces
yarn install

# Add dependency to specific workspace
yarn workspace api add @nestjs/graphql
yarn workspace web add @tanstack/react-query
yarn workspace native add tamagui

# Add dev dependency
yarn workspace api add -D jest

# Remove dependency
yarn workspace api remove @nestjs/graphql

# Run script in workspace
yarn workspace api dev
yarn workspace web build

# Run script in all workspaces
yarn workspaces foreach run build
yarn workspaces foreach run test

# Interactive upgrade
yarn upgrade-interactive
```

## Turborepo Configuration

### Basic Setup
```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "tasks": {
    "build": {
      "outputs": ["dist/**", ".next/**", "!.next/cache/**"],
      "dependsOn": ["^build"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "cache": false,
      "persistent": false
    },
    "lint": {
      "outputs": []
    },
    "clean": {
      "cache": false
    }
  }
}
```

### Task Orchestration

**Build Dependencies:**
- `^build` means "build dependencies first"
- Ensures packages are built before apps that depend on them

**Caching:**
- `cache: false` for dev servers and tests
- `persistent: true` for long-running processes
- Outputs specified for build artifacts

### Turborepo Commands
```bash
# Run tasks across all workspaces
turbo run build        # Build all apps
turbo run dev          # Start all dev servers
turbo run test         # Run all tests
turbo run lint         # Lint all code

# Run task for specific workspace
turbo run build --filter=api
turbo run dev --filter=web
turbo run test --filter=native

# Run task for multiple workspaces
turbo run dev --filter=web --filter=api

# Force run (ignore cache)
turbo run build --force

# Clear cache
turbo run clean
```

### Root Scripts
```json
// package.json (root)
{
  "scripts": {
    "dev": "turbo run dev",
    "dev:web": "turbo run dev --filter=web --filter=api",
    "dev:api": "turbo run dev --filter=api",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,md}\" --ignore-path .gitignore",
    "clean": "turbo run clean && rm -rf node_modules"
  }
}
```

## Shared Packages

### TypeScript Configuration Package

```
packages/
  typescript-config/
    ├── package.json
    ├── base.json           # Base config
    ├── nestjs.json         # NestJS-specific
    ├── nextjs.json         # Next.js-specific
    └── react-native-library.json
```

**Package.json:**
```json
{
  "name": "@repo/typescript-config",
  "version": "0.0.0",
  "private": true,
  "files": [
    "base.json",
    "nestjs.json",
    "nextjs.json",
    "react-native-library.json"
  ]
}
```

**Base Config:**
```json
// packages/typescript-config/base.json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
```

**NestJS Config:**
```json
// packages/typescript-config/nestjs.json
{
  "extends": "./base.json",
  "compilerOptions": {
    "module": "commonjs",
    "target": "ES2021",
    "lib": ["ES2021"],
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "incremental": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "strictPropertyInitialization": false
  }
}
```

### Using Shared Config
```json
// apps/api/tsconfig.json
{
  "extends": "@repo/typescript-config/nestjs.json",
  "compilerOptions": {
    "outDir": "./dist",
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Workspace Dependencies

### Internal Workspace References
```json
// apps/api/package.json
{
  "name": "api",
  "dependencies": {
    "@repo/typescript-config": "*"
  }
}
```

### Version Management
- Use `*` for internal workspace dependencies
- Yarn resolves to local workspace automatically
- Changes to packages immediately available to apps

## Development Workflows

### Starting Development Environment

**Full Stack:**
```bash
# Start all services
yarn dev

# API + Web only
yarn dev:web

# API only
yarn dev:api
```

**Individual Apps:**
```bash
# API with database
cd apps/api
yarn start:db    # Start PostgreSQL + Redis
yarn dev         # Start API in watch mode

# Web admin panel
cd apps/web
yarn dev         # Starts on port 5173

# Native mobile app
cd apps/native
yarn dev-local   # With local API
yarn dev         # With production API
```

### Building for Production

```bash
# Build all apps
yarn build

# Build specific app
cd apps/api && yarn build
cd apps/web && yarn build

# Build with Turborepo
turbo run build --filter=api
turbo run build --filter=web
```

### Code Quality

```bash
# Lint all workspaces
yarn lint

# Format all code
yarn format

# Workspace-specific
cd apps/api && yarn lint
cd apps/web && yarn format
```

## Environment Variables

### Organization
```
apps/
  api/
    .env
    .env.local
    .env.example
  web/
    .env
    .env.local
  native/
    .env.local
    .env.production
```

### Loading Environment Variables

**API (NestJS):**
```typescript
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
```

**Web (Vite):**
```typescript
// Access with import.meta.env
const apiUrl = import.meta.env.VITE_API_URL;
```

**Native (Expo):**
```typescript
// Access with process.env.EXPO_PUBLIC_*
const apiUrl = process.env.EXPO_PUBLIC_GRAPHQL_ENDPOINT;
```

### Turbo Global Dependencies
```json
// turbo.json
{
  "globalDependencies": ["**/.env.*local"]
}
```
This ensures Turbo cache is invalidated when env files change.

## Docker Compose Integration

### Root Compose File
```yaml
# compose.yml (root)
name: game-critique

include:
  - path: apps/api/compose.yml
```

### API Services
```yaml
# apps/api/compose.yml
services:
  postgres:
    image: postgres:15
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: game_critique
      POSTGRES_PASSWORD: password
      POSTGRES_DB: game_critique
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

### Docker Commands
```bash
# Start services (from root or apps/api)
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f postgres
docker-compose logs -f redis

# Reset databases
docker-compose down -v  # Removes volumes
```

## Git Hooks with Husky

### Setup
```json
// package.json (root)
{
  "scripts": {
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "prettier --write"
    ]
  }
}
```

### Pre-commit Hook
```bash
# .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

## GraphQL Schema Sharing

### Configuration
```yaml
# graphql.config.yml (root)
schema: "apps/api/src/schema.gql"
```

### Workflow
1. **API generates schema** on startup
2. **Schema file** at `apps/api/src/schema.gql`
3. **Web and Native** reference this schema for codegen
4. **IDE** uses schema for autocomplete

```typescript
// apps/web/codegen-dev.ts
const config: CodegenConfig = {
  schema: "http://localhost:3001/graphql",  // Or file path
  documents: "src/**/*.graphql",
  // ...
};

// apps/native/codegen.ts
const config: CodegenConfig = {
  schema: process.env.EXPO_PUBLIC_GRAPHQL_ENDPOINT,
  documents: ["modules/**/*.graphql"],
  // ...
};
```

## Adding a New Workspace

### 1. Create Workspace Directory
```bash
mkdir -p apps/new-app
cd apps/new-app
```

### 2. Initialize Package
```bash
yarn init -p
```

### 3. Configure Package.json
```json
{
  "name": "new-app",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "...",
    "build": "...",
    "test": "..."
  },
  "dependencies": {
    "@repo/typescript-config": "*"
  }
}
```

### 4. Install Dependencies
```bash
# From root
yarn install
```

### 5. Add Turbo Task (if needed)
```json
// turbo.json
{
  "tasks": {
    "new-task": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    }
  }
}
```

## Creating Shared Packages

### 1. Create Package Structure
```bash
mkdir -p packages/shared-utils
cd packages/shared-utils
```

### 2. Setup Package
```json
// packages/shared-utils/package.json
{
  "name": "@repo/shared-utils",
  "version": "0.0.0",
  "private": true,
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  },
  "devDependencies": {
    "@repo/typescript-config": "*",
    "typescript": "^5.0.0"
  }
}
```

### 3. TypeScript Config
```json
// packages/shared-utils/tsconfig.json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

### 4. Export Functions
```typescript
// packages/shared-utils/src/index.ts
export function formatDate(date: Date): string {
  return date.toISOString();
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-');
}
```

### 5. Build Package
```bash
cd packages/shared-utils
yarn build
```

### 6. Use in Apps
```json
// apps/api/package.json
{
  "dependencies": {
    "@repo/shared-utils": "*"
  }
}
```

```typescript
// apps/api/src/some-file.ts
import { formatDate, slugify } from '@repo/shared-utils';
```

## Troubleshooting

### Dependency Issues
```bash
# Clear all node_modules
yarn clean

# Reinstall everything
yarn install

# Rebuild packages
turbo run build
```

### Turbo Cache Issues
```bash
# Clear Turbo cache
turbo run build --force

# Or delete cache directory
rm -rf node_modules/.cache/turbo
```

### Workspace Not Found
```bash
# Check workspace configuration
yarn workspaces list

# Verify package.json workspace paths
# Ensure package names match
```

### Port Conflicts
```bash
# Find process using port
lsof -i :3000
lsof -i :5173

# Kill process
kill -9 <PID>

# Or change port in config
```

### TypeScript Errors
```bash
# Rebuild TypeScript projects
turbo run build --filter=@repo/typescript-config
turbo run build

# Restart TypeScript server in IDE
# VSCode: Cmd+Shift+P -> "TypeScript: Restart TS Server"
```

## Best Practices

### 1. Use Workspace Protocol
```json
// Use * for internal dependencies
"dependencies": {
  "@repo/typescript-config": "*"  // ✅ Good
  "@repo/typescript-config": "1.0.0"  // ❌ Bad
}
```

### 2. Keep Root Clean
- Only workspace orchestration in root
- App-specific code in workspaces
- Shared utilities in packages

### 3. Consistent Naming
- Apps: descriptive names (api, web, native)
- Packages: scoped with @repo/* prefix
- Scripts: consistent across workspaces

### 4. Proper Caching
- Enable cache for builds
- Disable cache for dev servers
- Specify outputs for cached tasks

### 5. Environment Isolation
- Each app manages its own env vars
- Use different prefixes (VITE_, EXPO_PUBLIC_)
- Never commit .env.local files

### 6. Build Order
- Use `dependsOn` for build dependencies
- Shared packages build before apps
- Parallelize independent builds

### 7. Version Pinning
- Pin external dependencies to exact versions
- Use workspace protocol for internal deps
- Document major version upgrades

## Development Commands Reference

```bash
# Root level
yarn install              # Install all dependencies
yarn dev                  # Start all apps
yarn dev:web             # Start web + api
yarn dev:api             # Start api only
yarn build               # Build all apps
yarn lint                # Lint all code
yarn format              # Format all code
yarn clean               # Clean all workspaces

# Workspace level
yarn workspace api dev
yarn workspace web build
yarn workspace native test

# Turbo commands
turbo run build
turbo run dev --filter=api
turbo run test --filter=web --filter=api
turbo run build --force

# Docker
docker-compose up -d
docker-compose down
docker-compose logs -f

# Yarn workspaces
yarn workspaces list
yarn workspaces foreach run build
yarn workspace api add lodash
```

## CI/CD Considerations

### Caching Strategy
```yaml
# .github/workflows/ci.yml
- name: Setup Turbo cache
  uses: actions/cache@v3
  with:
    path: .turbo
    key: ${{ runner.os }}-turbo-${{ github.sha }}
    restore-keys: |
      ${{ runner.os }}-turbo-
```

### Affected Apps Only
```bash
# Build only changed apps
turbo run build --filter=[HEAD^1]

# Test affected apps
turbo run test --filter=[main...HEAD]
```

### Parallel Jobs
```yaml
strategy:
  matrix:
    app: [api, web, native]
steps:
  - run: turbo run build --filter=${{ matrix.app }}
```
