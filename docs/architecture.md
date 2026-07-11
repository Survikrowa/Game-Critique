# Architektura — Game Critique

## Stack technologiczny

### Monorepo

| Narzędzie | Wersja | Rola |
|---|---|---|
| Turborepo | latest | Orkiestracja buildów |
| Yarn | 4.5.3 | Package manager (workspaces) |
| TypeScript | 5.x | Język programowania |

### Backend (`apps/api`)

| Technologia | Wersja | Rola |
|---|---|---|
| NestJS | 10.x | Framework backendu |
| Apollo Server | 4.x | GraphQL server |
| Prisma | 5.6.x | ORM |
| PostgreSQL | — | Główna baza danych |
| Redis | — | Cache + kolejki Bull |
| Bull | — | Kolejki zadań w tle |
| Passport + JWT | — | Autentykacja |
| Auth0 (jwks-rsa) | — | OAuth provider |
| Cloudinary | — | Przechowywanie obrazów |
| Puppeteer | — | Web scraping (HLTB) |
| Sentry | — | Monitoring błędów |
| SWC | — | Kompilator (szybki build) |

### Web Admin (`apps/web`)

| Technologia | Wersja | Rola |
|---|---|---|
| React | 18.3.1 | UI framework |
| Vite | 5.4.x | Build tool |
| TanStack Router | 1.121.x | File-based routing |
| TanStack Query | 5.62.x | Server state management |
| Tailwind CSS | 3.4.x | Styling |
| Radix UI | — | Primitives komponentów |
| Auth0 React SDK | — | Autentykacja |
| React Hook Form | 7.54.x | Formularze |
| Zod | 3.24.x | Walidacja schematów |
| GraphQL Code Generator | — | Generowanie typów TypeScript |

---

## Wzorce architektoniczne

### Backend — Architektura modułowa NestJS

Każdy feature jest osobnym modułem NestJS z pełną enkapsulacją:

```
src/modules/<feature>/
├── <feature>.module.ts       # Rejestracja zależności
├── <feature>.resolver.ts     # GraphQL resolver (warstwa HTTP)
├── <feature>.service.ts      # Logika biznesowa
├── <feature>.repository.ts   # Dostęp do danych (Prisma)
├── <feature>.dto.ts          # Typy GraphQL / DTO
├── <feature>.consumer.ts     # Bull queue consumer (opcjonalnie)
├── commands/                 # CQRS write operations
│   └── <command>/
│       ├── <command>.command.ts
│       └── <command>.handler.ts
└── queries/                  # CQRS read operations
    └── <query>/
        ├── <query>.query.ts
        └── <query>.handler.ts
```

### CQRS (Command Query Responsibility Segregation)

Złożone operacje używają wzorca CQRS przez `@nestjs/cqrs`:

- **Commands** — operacje zapisu zmieniające stan (np. `CreateUserCommand`, `UpdateGameDataCommand`)
- **Queries** — operacje odczytu zwracające dane (np. `GetGamesQuery`, `GetUserRoleQuery`)
- **Handlers** — przetwarzają commands/queries, wstrzykują repozytoria

### Repository Pattern

Cały dostęp do bazy danych jest odseparowany w repozytoriach (`*.repository.ts`).
Resolvery i serwisy nigdy nie importują Prisma bezpośrednio — tylko przez repozytoria.

### GraphQL — Code-First

Schema jest generowana automatycznie z TypeScript dekoratorów:
- `@ObjectType()` — typy wyjściowe
- `@InputType()` — typy wejściowe dla mutacji
- `@ArgsType()` — argumenty query/mutation
- `@Field()` — pola
- `@Query()` / `@Mutation()` — operacje

### Autoryzacja

Dwa guardy chronią operacje:

| Guard | Wymaga |
|---|---|
| `JwtAuthGuard` | Ważny token JWT (każdy zalogowany) |
| `AdminUserGuard` | Rola `ADMIN` w bazie danych |

---

## Web Admin — Architektura

### Routing

TanStack Router z file-based routing:
```
src/routes/
├── __root.tsx                    # Root layout + providers
├── _layout.tsx                   # Layout z sidebar
├── _layout/
│   ├── index.tsx                 # Strona główna (/)
│   └── _admin_layout.tsx         # Admin layout (chroniony)
│       └── admin/
│           ├── index.tsx         # /admin
│           ├── users/index.tsx   # /admin/users
│           ├── games/index.tsx   # /admin/games
│           ├── user-games/index.tsx  # /admin/user-games
│           └── resources/
│               └── platforms/index.tsx  # /admin/resources/platforms
```

### Dane

- **TanStack Query** — cały server state (fetching, caching, invalidation)
- **GraphQL Code Generator** — auto-generowane hooki (`.generated.ts`) z `.graphql` plików
- **Custom fetcher** (`src/codegen/fetcher.ts`) — wysyła JWT token w każdym requeście

### Struktura feature'ów

```
src/features/admin/<feature>/
├── <feature>.tsx                  # Główny komponent widoku
├── <sub_feature>/
│   ├── use_<operation>/
│   │   ├── <operation>.graphql    # GraphQL query/mutation
│   │   ├── <operation>.generated.ts  # Auto-generowane
│   │   └── use_<operation>.ts     # Hook opakowujący
│   └── <sub_feature>.tsx          # Komponent UI
```

---

## Przepływ autentykacji

```
1. Użytkownik loguje się przez Auth0 (OAuth)
2. Auth0 zwraca JWT token
3. Frontend przechowuje token w TanStack Query cache
4. Każdy request GraphQL/REST wysyła: Authorization: Bearer <token>
5. JwtAuthGuard waliduje token (jwks-rsa)
6. AdminUserGuard sprawdza rolę w bazie danych
7. @User() dekorator wyciąga dane usera z kontekstu
```

---

## Infrastruktura lokalnego dewelopmentu

```yaml
# compose.yml
services:
  postgres:   # PostgreSQL na porcie 5432
  redis:      # Redis na porcie 6379
```

API działa na porcie `3001`, Web admin na porcie `5173`.
Vite proxy: `/api` → `http://localhost:3001`
