## Plan: Refaktoryzacja API pod CQRS i Architekturę Heksagonalną

Ten plan ma na celu przekształcenie obecnej architektury "N-Tier" w pełnoprawną Architekturę Heksagonalną (Ports & Adapters) z CQRS, aby odseparować logikę biznesową od frameworka i bazy danych.

### Główne Założenia
*   **Domain Layer (Jądro)**: Czyste klasy TypeScript (Encje, Value Objects). Zero zależności od NestJS, Prisma czy zewnętrznych bibliotek.
*   **Application Layer**: Obsługa Use Cases (CQRS Handlers). Definiuje interfejsy (Porty) dla komunikacji ze światem zewnętrznym.
*   **Infrastructure Layer**: Implementacje interfejsów (Adaptery). Tu żyje Prisma, Resolvery GraphQL, Kontrolery REST i konfiguracja modułów NestJS.

### Struktura folderów (Nowy schemat)
Dla każdego modułu (np. `games`, `users`) zastosujemy strukturę:
```
modules/<feature>/
├── domain/                  # WARSTWA DOMENY
│   ├── models/              # Encje (np. Game, User) i Value Objects
│   └── ports/               # Interfejsy repozytoriów i serwisów zewnętrznych
├── application/             # WARSTWA APLIKACJI
│   ├── commands/            # Komendy i ich Handlery (WRITE model)
│   └── queries/             # Zapytania i ich Handlery (READ model)
└── infrastructure/          # WARSTWA INFRASTRUKTURY
    ├── adapters/            # Implementacje portów (np. PrismaGameRepository)
    ├── graphql/             # Resolvery i DTO (Inputs/Args)
    └── <feature>.module.ts  # Konfiguracja modułu (DI)
```

### Steps

#### Faza 1: Przygotowanie Fundamentów
1.  **Utwórz współdzielone abstrakcje w `libs/ddd` (lub `shared`)**
    *   Stwórz klasy bazowe `AggregateRoot` i `Entity` dla domeny.
    *   Zdefiniuj typy generyczne dla `RepositoryPort`.

#### Faza 2: Migracja Modułu `Games` (Jako Pilot)
To najbardziej złożony moduł, idealny do przetestowania wzorca.

1.  **Wyodrębnij Domenę (`domain/`)**
    *   Stwórz encję `Game` w `domain/models/game.model.ts`. Przenieś tam logikę biznesową (np. walidacje stanu, metody operujące na danych), która obecnie jest rozproszona w serwisach.
    *   Zdefiniuj interfejs `GameRepositoryPort` w `domain/ports/`. Powinien operować na encjach domeny, nie na typach Prisma.

2.  **Przenieś Warstwę Aplikacji (`application/`)**
    *   Przenieś obecne `commands/` i `queries/` do folderu `application/`.
    *   W `UpdateGameDataHandler`:
        *   Zamiast `PrismaService`, wstrzyknij `GameRepositoryPort`.
        *   Zamiast bezpośrednich operacji na DB: pobierz encję -> wykonaj metodę na encji -> zapisz encję.

3.  **Zbuduj Warstwę Infrastruktury (`infrastructure/`)**
    *   Stwórz `PrismaGameRepository` w `adapters/`, który implementuje `GameRepositoryPort`.
    *   To tutaj przenieś logikę mapowania z obiektów Prisma na Encje Domenowe (Mappery).
    *   Przenieś `GamesResolver` do `infrastructure/graphql/`.

4.  **Skonfiguruj Dependency Injection**
    *   W `GamesModule` zarejestruj implementację portu: `provide: GameRepositoryPort, useClass: PrismaGameRepository`.

#### Faza 3: Migracja Modułu `Users` i `Profiles`
Powtórz proces dla zarządzania użytkownikami, co uporządkuje zależności Auth0 i seedowania.

1.  **Separacja Modeli**
    *   Stwórz domenowy model `User`, który posiada metody biznesowe (np. `updateProfile`, `addFriend`).
    *   Oddziel model bazy danych (Prisma User) od modelu domeny.

2.  **Adaptery Zewnętrzne**
    *   Dla integracji z Auth0 (User Management), stwórz port `IdentityServicePort` w domenie i adapter w infrastrukturze.

#### Faza 4: CQRS - Rozdzielenie Modelu Odczytu (Read Model)
Dla zapytań (Queries), pełna heksagonalna "czystość" bywa uciążliwa (overhead przy mapowaniu).

1.  **Optymalizacja Queries**
    *   Zezwól Handlerom Query (`application/queries/`) na bezpośredni dostęp do `PrismaService` lub dedykowanych widoków (Raw SQL), pomijając Encje Domenowe na rzecz szybkich DTO (Read Models).
    *   Dla Command (zapis) **zawsze** używaj Repozytoriów i Encji.

### Further Considerations
1.  **Mappery**: Będziesz potrzebował mapperów (np. `GameMapper`), które konwertują `PrismaGame` <-> `DomainGame`. To wymaga napisania dodatkowego kodu, ale daje niezależność.
2.  **Komunikacja między modułami**: Moduł `Games` nie powinien importować `UsersService`. Zamiast tego `Games` powinien zdefiniować port `OwnerServicePort`, a moduł `Users` powinien go zaimplementować (lub użyć QueryBus/CommandBus do komunikacji).
3.  **Transakcje**: W architekturze heksagonalnej transakcje są trudniejsze. Rozważ użycie `UnitOfWork` lub mechanizmu transakcji NestJS (`ClsService`) w warstwie aplikacji.
