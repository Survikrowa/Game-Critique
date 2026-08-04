# GitHub Copilot Skills - Game Critique Project

## Project Overview
Game Critique is a monorepo project built with Turborepo containing:
- **API**: NestJS GraphQL backend serving both web and native clients
- **Web**: Vite + React admin panel with TanStack Router and React Query
- **Native**: Expo React Native mobile app using **Gluestack UI + NativeWind** (migrated from Tamagui)

## Technology Stack

### Monorepo Structure
- **Build System**: Turborepo with Yarn 4.5.3 workspaces
- **Node Version**: >=18
- **Package Manager**: Yarn 4.5.3
- **Linting**: ESLint with Prettier
- **Git Hooks**: Husky with lint-staged

### API (apps/api)
**Framework & Core**
- NestJS 10.x with TypeScript 5.3.3
- GraphQL with Apollo Server 4.x and @nestjs/graphql
- Code-first GraphQL schema generation (schema.gql auto-generated)
- SWC compiler for faster builds

**Architecture Patterns**
- CQRS pattern (@nestjs/cqrs) with Commands and Queries
- Repository pattern for data access
- Module-based architecture with feature modules
- Middleware for logging (AppLoggerMiddleware)
- Guards for authentication and authorization (JwtAuthGuard, AdminUserGuard)

**Database & ORM**
- PostgreSQL with Prisma 5.6.x
- Prisma migrations in `prisma/migrations/`
- Database seeders in `prisma/seeders/`
- Models: User, Profile, Game, GamesStatus, Friend, Collection, etc.

**Key Features & Modules**
- Authentication: JWT with Auth0 OAuth integration (passport-jwt, jwks-rsa)
- Search: Game search functionality
- Games: CRUD operations, metadata management, IGDB integration
- User Management: Profiles, Friends, Roles (Admin/User)
- Game Status: Track user's game progress and collections
- Images: Cloudinary integration for image uploads
- Background Jobs: Bull/Redis for queue processing
- Scheduled Tasks: @nestjs/schedule for cron jobs
- Web Scraping: Puppeteer for HowLongToBeat data extraction
- Error Tracking: Sentry integration

**Testing**
- Jest for unit tests
- Supertest for e2e tests
- Test config: jest-e2e.json

**Development Commands**
- `yarn dev`: Watch mode development
- `yarn build`: Production build with SWC
- `yarn start:db`: Docker Compose database setup
- `yarn prisma-generate`: Generate Prisma client
- `yarn prisma-migrate-dev`: Create migrations
- `yarn prisma-seed`: Seed database

### Web (apps/web)
**Framework & Core**
- React 18.3.1 with TypeScript 5.6.3
- Vite 5.4.11 for build tooling
- TanStack Router 1.121.24 for file-based routing
- TanStack Query 5.62.2 for server state management

**UI & Styling**
- Tailwind CSS 3.4.16 with PostCSS
- Radix UI components for accessible primitives
- Custom design system with class-variance-authority
- Lucide React icons
- Geist font family

**GraphQL Integration**
- GraphQL Code Generator for type-safe queries
- Custom fetcher function (@/codegen/fetcher)
- Near-operation-file preset for generated code
- React Query hooks integration
- Schema: http://localhost:3001/graphql (dev)

**Authentication & Authorization**
- Auth0 React SDK (@auth0/auth0-react)
- JWT-based authentication
- Role-based access control (Admin/User roles)
- Auth context in router

**Forms & Validation**
- React Hook Form 7.54.1
- Zod 3.24.1 for schema validation
- @hookform/resolvers for Zod integration

**Key Features**
- Admin panel for user management
- User roles management
- Game data administration
- Protected routes based on authentication and roles

**Development Tools**
- React Router DevTools
- React Query DevTools
- ESLint 9.16.0 with strict configuration
- Import sorting (eslint-plugin-simple-import-sort)

**Development Commands**
- `yarn dev`: Start Vite dev server (port 5173)
- `yarn build`: Production build
- `yarn generate-codegen-dev`: Generate GraphQL types

### Native (apps/native)
**Framework & Core**
- Expo SDK 49.x with React Native 0.72.10
- Expo Router 2.x for file-based navigation
- TypeScript 5.3.2

**UI Framework — Gluestack UI + NativeWind (migracja z Tamagui ukończona)**
- Gluestack UI v2 dla komponentów
- NativeWind (Tailwind CSS) dla stylowania przez `className`
- `ui/` — własna biblioteka komponentów opakowujących Gluestack
- `GluestackUIProvider` w `components/ui/gluestack-ui-provider/index.tsx` — root provider z dark mode
- Lucide icons z `lucide-react-native`
- **WAŻNE**: `theme.colors` w `tailwind.config.js` nadpisuje całą paletę Tailwind — `text-white` NIE istnieje, używaj `text-typography-white` (zdefiniowanego w `extend.colors.typography.white`)
- **WAŻNE**: Gluestack `Image` nadpisuje prop `style` na webzie — do absolutnego pozycjonowania używaj `Image as RNImage` z `react-native`
- `LinearGradient` z `expo-linear-gradient` NIE jest patchowany przez NativeWind — używaj inline `style`, nie `className`

**Navigation**
- Expo Router with stack and tabs layout
- React Navigation Drawer integration
- Safe area handling (react-native-safe-area-context)

**GraphQL Integration**
- Apollo Client 3.8.8 for GraphQL queries/mutations
- GraphQL Code Generator with near-operation-file preset
- Apollo DevTools plugin
- Schema: EXPO_PUBLIC_GRAPHQL_ENDPOINT

**Authentication**
- React Native Auth0 3.1.0
- Expo Secure Store for token persistence
- OAuth integration

**Forms & Validation**
- React Hook Form 7.49.3
- Zod 3.22.4 for validation
- @hookform/error-message for error display

**Native Features**
- Expo Image Picker for photo selection
- Expo Document Picker for file uploads
- Expo Device for device information
- Toast notifications (Burnt, @tamagui/toast)
- Floating Action Button (react-native-floating-action)

**UI Components**
- Custom component library in `ui/` directory:
  - Data Display: Charts (react-native-gifted-charts), Carousels
  - Feedback: Toasts, Loading states, Skeletons (animowane shimmer)
  - Forms: Inputs, Pickers, Checkboxes
  - Overlay: Modals, Dialogs
  - Panels: Cards, Sheets
  - Typography: Text component (`ui/typography/text.tsx`) z wariantami size/weight/color

**Key Features**
- Game status tracking and management
- Photo uploads for game covers
- User profile management
- Friends system
- Search functionality with local recent searches history (expo-secure-store)
- **UWAGA**: Kolekcje (Collections) są oficjalnie niewspierane — nie dodawaj nowego kodu związanego z kolekcjami

**Build & Deploy**
- EAS Build for Android and iOS
- Local builds with `--local` flag
- Custom build hooks (eas-build-post-install)
- ADB reverse for local API connection

**Development Commands**
- `yarn dev`: Run Android with production API
- `yarn dev-local`: Start with local API (port 3001)
- `yarn generate-graph`: Generate GraphQL types (local)
- `yarn build-android`: EAS build for Android
- `yarn build-ios`: EAS build for iOS

## Code Patterns & Conventions

### API Module Structure
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
    <feature>.repository.ts # Data access
    <feature>.dto.ts       # DTOs and GraphQL types
    <feature>.consumer.ts  # Bull queue consumer (if applicable)
```

### GraphQL Schema Patterns
- Use decorators: `@ObjectType()`, `@Field()`, `@ArgsType()`, `@InputType()`
- DTOs for input/output types
- Resolvers use `@Query()`, `@Mutation()`, `@Resolver()`
- Guards for protection: `@UseGuards(JwtAuthGuard, AdminUserGuard)`

### Native App Structure
```
app/
  (app)/                   # Authenticated routes
    (tabs)/                # Tab navigation
    auth/                  # Auth screens
    search/                # Search screens
modules/                   # Feature modules
  <feature>/
    <component>.tsx
    use_<hook>/
      <hook>.graphql       # GraphQL operation
      <hook>.generated.ts  # Auto-generated hooks
ui/                        # Shared UI components
  <category>/
    <component>/
      <component>.tsx
```

### Web App Structure
```
src/
  features/                # Feature modules
    <feature>/
      <component>/
        use_<hook>/
          <hook>.graphql
          <hook>.generated.ts
  packages/                # Shared packages
  routes/                  # TanStack Router routes
    __root.tsx
    _layout/               # Layout components
  lib/                     # Utility functions
  assets/                  # Static assets
```

### GraphQL Code Generation
- GraphQL operations in `.graphql` files co-located with components
- Auto-generated TypeScript types and hooks
- Native: Apollo hooks (`useQuery`, `useMutation`)
- Web: React Query hooks with custom fetcher
- Base types generated separately from operation-specific types

### State Management
- **API**: NestJS dependency injection
- **Web**: TanStack Query for server state, React Context for auth
- **Native**: Zustand for local state, Apollo Client cache for server state

### Authentication Flow
1. Auth0 OAuth login in web/native
2. JWT token stored securely
3. Token sent in Authorization header
4. API validates with JwtAuthGuard
5. User/role checked with AdminUserGuard for protected operations

### Styling Conventions
- **Web**: Tailwind utility classes with cn() helper
- **Native**: NativeWind `className` na komponentach opartych o `View`/`Text` z react-native lub Gluestack
- Kolory tokenowe: `bg-background-0/50/100`, `text-typography-100/400/white`, `text-primary-500`
- NIE używaj `text-white` w Native — użyj `text-typography-white`

### Safe Area — Native
- **ZAWSZE używaj `SafeAreaView` z `edges={['top']}`** dla screenów z własnym headerem (`headerShown: false`)
- NIE używaj `useSafeAreaInsets()` + `paddingTop` jako głównej metody — `SafeAreaView` jest niezawodniejszy na Android
- `useSafeAreaInsets()` jest OK do drobnych przesunięć wewnątrz komponentów (np. floating button position)

### Ekrany z własnym headerem (headerShown: false)
Pattern dla screenu który zarządza własną nawigacją (np. search, game detail):
```tsx
// W _layout.tsx:
<Stack.Screen name="search" options={{ headerShown: false }} />

// W komponencie:
<SafeAreaView className="flex-1 bg-background-0" edges={["top"]}>
  {/* własny header bar */}
  <ScrollView>...</ScrollView>
</SafeAreaView>
```

### Obsługa autoryzacji w Apollo (Native)
- Sprawdzaj `user` z `useAuth0()` przed wywołaniem query wymagającego auth
- Dodaj `skip: !user` do Apollo hooks dla zapytań wymagających autoryzacji
- `useUserProfileInfo()` wywołuj TYLKO gdy user jest zalogowany (unikaj unauthorized errors)

## Common Tasks

### Adding a New API Feature
1. Generate module: `nest g module modules/<feature>`
2. Create DTOs with GraphQL decorators
3. Create repository for data access
4. Implement service with business logic
5. Create resolver with queries/mutations
6. Add guards for protected routes
7. Register module in app.module.ts
8. Schema auto-generates on startup

### Adding GraphQL Operations
1. Create `.graphql` file in feature directory
2. Write query/mutation
3. Run codegen: `yarn generate-graph` (native) or `yarn generate-codegen-dev` (web)
4. Import generated hook in component
5. Use with TypeScript type safety

### Database Changes
1. Update `prisma/schema.prisma`
2. Create migration: `yarn prisma-migrate-dev <name>`
3. Generate client: `yarn prisma-generate`
4. Update DTOs and repositories
5. Test changes

### Adding UI Components
- **Native**: Add to `ui/<category>/<component>/`
  - Używaj Gluestack UI jako bazy, owijaj w własny komponent w `ui/`
  - Każdy komponent w osobnym pliku — nie łącz wielu komponentów w jednym pliku
  - Eksportuj typy pomocnicze z komponentów (nie z osobnych plików types)
  - Use TypeScript interfaces for props
  - Include proper error handling and loading states (`Skeleton` dla loading, `ErrorState` dla błędów, `EmptyState` dla pustych list)
- **Web**: Add to `src/features/<feature>` or shared location
- Follow existing patterns for props and exports
- Include proper error handling and loading states

## Environment Variables

### API
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_HOST`, `REDIS_PORT`: Redis for Bull queues
- `SENTRY_DSN`: Error tracking
- `NODE_ENV`: development/production
- Auth0, IGDB, Cloudinary credentials

### Native
- `EXPO_PUBLIC_AUTH0_DOMAIN`, `EXPO_PUBLIC_AUTH0_CLIENT_ID`
- `EXPO_PUBLIC_GRAPHQL_ENDPOINT`: API URL
- Environment-specific configs in .env files

### Web
- Auth0 configuration
- GraphQL endpoint (runtime or build-time)

## Testing Strategies
- **API**: Unit tests for services, e2e tests for resolvers
- **Web**: Component testing with React Testing Library (setup needed)
- **Native**: Component testing with React Native Testing Library (setup needed)
- Integration tests for GraphQL operations

## Deployment
- **API**: Docker containers with docker-compose
- **Web**: Static build deployed to hosting (Nginx config included)
- **Native**: EAS Build for app stores
- Production compose file: `compose.prod.yml`

## Known Patterns to Follow
1. Always use TypeScript strict mode
2. Use Zod for runtime validation
3. Co-locate GraphQL operations with components
4. Follow CQRS for complex operations
5. Use repositories for data access abstraction
6. Implement proper error handling with HttpException
7. Use guards for all protected routes
8. Keep UI components pure and reusable
9. Use debouncing for search inputs (use-debounce) — 500ms dla search
10. Handle loading and error states consistently — używaj `Skeleton` zamiast `ActivityIndicator`
11. **NEVER use barrel exports** (index.ts/index.js files that re-export from other files). Always import directly from the source file (e.g., `import { Box } from "../layout/box/box"` instead of `import { Box } from "../layout/box"`).
12. **Każdy sub-komponent w osobnym pliku** — nie definiuj wielu komponentów w jednym pliku. Np. `StatColumn` → `game_stat_column/game_stat_column.tsx`
13. **Eksportuj typy z komponentów** zamiast importować przez długi chain typów. Np. `export type SearchGameResult = SearchGamesQuery["search"]["games"][number]` w `search_result.tsx` i importuj ten typ wszędzie indziej
14. **Lokalna historia wyszukiwania** przechowywana w `expo-secure-store` (nie API). Maks 4 ostatnie gry, deduplicacja po id
15. **Touch targets minimum 44pt** (`min-h-[44px]`) na wszystkich klikalnych elementach
16. **Haptic feedback**: `haptic.light()` na nawigacji, `haptic.medium()` na akcjach zapisu/edycji

## API — Krytyczne zasady

### JwtAuthGuard + CqrsModule
`JwtAuthGuard` wstrzykuje `QueryBus` z `CqrsModule`. `AuthModule` musi eksportować `CqrsModule` żeby moduły importujące `AuthModule` miały dostęp do `QueryBus`:
```typescript
// auth.module.ts
exports: [PassportModule, AuthService, CqrsModule],
```

### HLTB — pola completion time
- `comp_main` — fabuła główna (w sekundach)
- `comp_plus` — fabuła + extra (w sekundach)  
- `comp_100` — 100% completionist (w sekundach) ← **używaj tego**
- `comp_all` — średnia WSZYSTKICH stylów gry ← **NIE używaj do 100%**

### timeToRelative — konwersja sekund HLTB
HLTB przechowuje wartości w sekundach. Wyświetlanie powinno zaokrąglać do 0.5h (jak HLTB na stronie):
```typescript
const hoursRounded = Math.round(hoursExact * 2) / 2; // nearest 0.5h
```
Kolejność argumentów `pluralizePolish`: `(count, singular, few, many)` = `(n, "godzina", "godziny", "godzin")`

## Useful Commands
```bash
# Root
yarn dev                    # Start all in dev mode
yarn dev:web               # Start web + api
yarn dev:api               # Start api only
yarn build                 # Build all
yarn lint                  # Lint all
yarn format                # Format all

# API
cd apps/api
yarn dev                   # Watch mode
yarn build                 # Production build
yarn start:db             # Start PostgreSQL + Redis
yarn prisma-generate      # Generate Prisma client
yarn prisma-migrate-dev   # Create migration
yarn prisma-seed          # Seed database

# Web
cd apps/web
yarn dev                   # Vite dev server
yarn build                 # Production build
yarn generate-codegen-dev # Generate GraphQL types

# Native
cd apps/native
yarn dev                   # Android dev with prod API
yarn dev-local            # Android dev with local API
yarn generate-graph       # Generate GraphQL types
yarn build-android        # EAS build Android
```

## File Naming Conventions
- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **GraphQL files**: snake_case (e.g., `verify_user.graphql`)
- **Hooks**: `use_<name>` folder with `<name>.generated.ts`
- **API modules**: snake_case folders and files
- **Tests**: `<name>.spec.ts` or `<name>.e2e-spec.ts`

## Import Aliases
- **API**: Uses tsconfig paths (e.g., `@/modules/...`)
- **Web**: `@/` → `src/`
- **Native**: Relative imports for modules, absolute for ui
- **Important**: Always import directly from source files, NOT from index.ts barrel exports (e.g., use `from "./box/box"` not `from "./box"`)

## Dependencies Management
- Use exact versions for critical dependencies
- Regularly update with `yarn upgrade-interactive`
- Check for CVEs before adding new packages
- Shared configs in `packages/typescript-config/`
