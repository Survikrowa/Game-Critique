# API — Dokumentacja funkcji

Backend: **NestJS 10**, **GraphQL (code-first)**, **PostgreSQL + Prisma**  
Endpoint GraphQL: `POST /graphql`  
REST endpointy: `/images/upload`, `/hltb/migrate`

---

## Autoryzacja

Wszystkie chronione operacje wymagają nagłówka:
```
Authorization: Bearer <JWT_TOKEN>
```

| Guard | Wymaganie |
|---|---|
| `JwtAuthGuard` | Ważny token JWT (każdy zalogowany użytkownik) |
| `AdminUserGuard` | Rola `ADMIN` w bazie danych |

---

## Moduł: Auth

**Cel:** Autentykacja przez Auth0, tworzenie/weryfikacja kont użytkowników.

### Queries

#### `verify` — weryfikacja sesji użytkownika
```graphql
query {
  verify {
    authorized
    role
  }
}
```
- **Guard:** `JwtAuthGuard`
- Przy pierwszym logowaniu **tworzy konto** użytkownika w bazie (Command: `CreateUserCommand`)
- Pobiera dane profilu z Auth0 (`nickname`)
- Rejestruje event `UserCreated` w aktywności
- Zwraca status autoryzacji i rolę użytkownika

**Zwraca:**
```typescript
{
  authorized: boolean
  role: RoleEnum | null  // "ADMIN" | "USER" | null
}
```

---

## Moduł: Users

**Cel:** Pobieranie danych użytkowników.

### Queries

#### `user(oauthId)` — dane pojedynczego użytkownika
```graphql
query {
  user(oauthId: "auth0|123") {
    id
    oauthId
    profile { name, avatarUrl, id }
    gamesStatus { ... }
    userActivity { ... }
  }
}
```
- **Guard:** brak (publiczne)
- Zwraca dane użytkownika z profilem, statusami gier (limit 5) i aktywnością

#### `users` — lista wszystkich użytkowników
```graphql
query {
  users {
    id
    oauthId
    profile { name, avatarUrl, id }
    role
  }
}
```
- **Guard:** `JwtAuthGuard` + `AdminUserGuard`
- Tylko dla administratorów

---

## Moduł: Profiles

**Cel:** Zarządzanie profilem zalogowanego użytkownika.

### Queries

#### `profileInfo` — dane profilu zalogowanego użytkownika
```graphql
query {
  profileInfo {
    id
    name
    avatarUrl
  }
}
```
- **Guard:** `JwtAuthGuard`

### Mutations

#### `updateProfileInfo` — aktualizacja profilu
```graphql
mutation {
  updateProfileInfo(profileInfo: {
    name: "Jan Kowalski"
    avatarUrl: "https://res.cloudinary.com/..."
  }) {
    success
  }
}
```
- **Guard:** `JwtAuthGuard`
- Aktualizuje `name` i `avatarUrl` profilu

---

## Moduł: Roles

**Cel:** Zarządzanie rolami użytkowników (tylko admin).

### Queries

#### `roles` — lista wszystkich ról
```graphql
query {
  roles {
    id
    name
  }
}
```
- **Guard:** `JwtAuthGuard` + `AdminUserGuard`

### Mutations

#### `updateUserRole` — zmiana roli użytkownika
```graphql
mutation {
  updateUserRole(updateUserRoleInput: {
    oauthId: "auth0|123"
    roleId: 2
  }) {
    success
  }
}
```
- **Guard:** `JwtAuthGuard` + `AdminUserGuard`

---

## Moduł: Games

**Cel:** Zarządzanie bazą gier, pobieranie danych, upcoming games z IGDB.

### Queries

#### `game(hltbId)` — szczegóły jednej gry
```graphql
query {
  game(hltbId: 12345) {
    id
    name
    slug
    hltbId
    cover { smallUrl, mediumUrl, bigUrl }
    platforms { id, name, slug, displayName }
    releases { date }
    genres { name, slug }
    completionTime { main, mainExtra, completionist }
  }
}
```
- **Guard:** brak (publiczne)

#### `games` — paginowana lista gier
```graphql
query {
  games(search: "Zelda", take: 10, skip: 0) {
    items {
      id, name, hltbId, cover { smallUrl }
    }
    pagination {
      total, take, skip, hasNextPage, hasPreviousPage
    }
  }
}
```
- **Guard:** brak (publiczne)
- Filtrowanie po nazwie (opcjonalne)

#### `upcomingGames(limit)` — nadchodzące premiery (IGDB)
```graphql
query {
  upcomingGames(limit: 10) {
    id
    name
    coverUrl
    backgroundUrl
    releaseDate
    platforms { id, name }
  }
}
```
- **Guard:** brak (publiczne)
- Dane pobierane z IGDB API w czasie rzeczywistym

### Mutations

#### `updateGameData(hltbId)` — wymuszenie aktualizacji danych gry
```graphql
mutation {
  updateGameData(hltbId: 12345) {
    hltbId
    message
  }
}
```
- **Guard:** `JwtAuthGuard` + `AdminUserGuard`
- Uruchamia Command `UpdateGameDataCommand`
- Aktualizuje dane z HLTB/IGDB (okładka, czas ukończenia, platformy, gatunki)

---

## Moduł: Games Status

**Cel:** Śledzenie statusów gier użytkownika — najważniejszy moduł aplikacji.

### Statusy gry (`GameStatus` enum)
- `COMPLETED` — ukończona
- `IN_PROGRESS` — w trakcie
- `BACKLOG` — w kolejce
- `RETIRED` — porzucona

### Mutations

#### `upsertGameStatus` — dodanie lub edycja statusu gry
```graphql
mutation {
  upsertGameStatus(upsertGameStatusArgs: {
    isEditing: false
    gameId: 123
    platformId: 5
    gameStatus: COMPLETED
    score: "9/10"
    review: "Świetna gra!"
    achievementsCompleted: true
    completedIn: { hours: "40", minutes: "30", seconds: "0" }
    gamesStatusId: null  # podać przy edycji
  }) {
    message
  }
}
```
- **Guard:** `JwtAuthGuard`
- Przy `isEditing: false` — nowy wpis (blokuje duplikaty tej samej gry+platformy)
- Przy `isEditing: true` — aktualizacja istniejącego wpisu (wymaga `gamesStatusId`)

#### `removeGameStatus(gameStatusId)` — usunięcie swojego statusu
```graphql
mutation {
  removeGameStatus(gameStatusId: 42) {
    message
  }
}
```
- **Guard:** `JwtAuthGuard`

#### `removeUserGameStatusByUserOauthId` — usunięcie statusu przez admina
```graphql
mutation {
  removeUserGameStatusByUserOauthId(gameStatusId: 42, oauthId: "auth0|123") {
    message
  }
}
```
- **Guard:** `JwtAuthGuard` + `AdminUserGuard`

### Queries

#### `userGamesStatus` — paginowana lista statusów zalogowanego użytkownika
```graphql
query {
  userGamesStatus(
    take: 10
    skip: 0
    status: COMPLETED   # opcjonalne
    search: "Zelda"     # opcjonalne
    filters: {}         # opcjonalne
    sort: {}            # opcjonalne
  ) {
    userGamesStatus {
      id, score, review, status, achievementsCompleted
      platform { name }
      game { name, hltbId, cover { smallUrl } }
      completedIn { hours, minutes, seconds }
    }
    pagination { total, take, skip }
  }
}
```
- **Guard:** `JwtAuthGuard`
- Obsługuje filtrowanie, sortowanie i paginację

#### `userFriendGamesStatus` — statusy gier znajomego
```graphql
query {
  userFriendGamesStatus(
    oauthId: "auth0|456"
    take: 10
    skip: 0
  ) { ... }
}
```
- **Guard:** `JwtAuthGuard`

#### `userGameStatus` — pojedynczy status gry
```graphql
query {
  userGameStatus(gameStatusId: 42) {
    id, score, review, status
    game { name }
    platform { name }
  }
}
```
- **Guard:** `JwtAuthGuard`

#### `getAllUserGamesStatusByOauthId(oauthId)` — wszystkie statusy użytkownika (admin)
```graphql
query {
  getAllUserGamesStatusByOauthId(oauthId: "auth0|123") { ... }
}
```
- **Guard:** `JwtAuthGuard` + `AdminUserGuard`

#### `ownerAndFriendsGameStatusReviews(gameStatusId)` — recenzje znajomych dla danej gry
```graphql
query {
  ownerAndFriendsGameStatusReviews(gameStatusId: 42) {
    profile { name, avatarUrl }
    review
    score
  }
}
```
- **Guard:** `JwtAuthGuard`
- Zwraca recenzje zalogowanego użytkownika i jego znajomych dla tej gry

#### `lastEditedGames(limit)` — ostatnio edytowane statusy
```graphql
query {
  lastEditedGames(limit: 5) {
    id, name, status
    cover { smallUrl }
  }
}
```
- **Guard:** `JwtAuthGuard`

#### `gamesStatusSortOptions` — dostępne opcje sortowania
```graphql
query {
  gamesStatusSortOptions {
    sortOptions { id, field, order, label }
  }
}
```
- **Guard:** `JwtAuthGuard`

#### `availableGamesStatusProgressStates` — dostępne statusy
```graphql
query {
  availableGamesStatusProgressStates {
    gameStatusProgressState { label, value }
  }
}
```
- **Guard:** `JwtAuthGuard`

---

## Moduł: Collections

**Cel:** Tworzenie i zarządzanie kolekcjami gier przez użytkownika.

### Mutations

#### `createNewCollection` — tworzenie kolekcji
```graphql
mutation {
  createNewCollection(collection: {
    name: "Moje ulubione RPG"
    description: "Kolekcja najlepszych gier RPG"
  }) {
    id, name, description
  }
}
```
- **Guard:** `JwtAuthGuard`
- Kolekcja jest powiązana z profilem zalogowanego użytkownika

#### `removeCollection` — usunięcie kolekcji (soft delete)
```graphql
mutation {
  removeCollection(collection: { collectionId: 5 }) {
    success
  }
}
```
- **Guard:** `JwtAuthGuard`
- Zmienia status na `REMOVED` (soft delete)

#### `addGameToCollection` — dodanie gry do kolekcji
```graphql
mutation {
  addGameToCollection(collection: {
    collectionId: 5
    hltbGameId: 12345
  }) {
    success
  }
}
```
- **Guard:** `JwtAuthGuard`

### Queries

#### `getProfileCollections` — kolekcje zalogowanego użytkownika
```graphql
query {
  getProfileCollections {
    id, name, description
  }
}
```
- **Guard:** `JwtAuthGuard`

#### `collection(id)` — szczegóły kolekcji z grami
```graphql
query {
  collection(id: 5) {
    id, name, description
    games { id, name, cover { smallUrl } }
  }
}
```
- **Guard:** `JwtAuthGuard`

---

## Moduł: Search

**Cel:** Wyszukiwanie gier przez HowLongToBeat API. Automatycznie dodaje znalezione gry do lokalnej bazy.

### Queries

#### `search(input)` — wyszukiwanie gier
```graphql
query {
  search(input: "The Legend of Zelda") {
    games {
      id, name, slug, hltbId
      cover { small_url }
    }
  }
}
```
- **Guard:** brak (publiczne)
- Pobiera wyniki z HLTB API
- Automatycznie kolejkuje znalezione gry do zapisu w bazie (Bull queue)

---

## Moduł: Friends

Moduł podzielony na 4 pod-moduły.

### Friends Search — Wyszukiwanie użytkowników

#### `usersSearch(input)` — wyszukiwanie użytkowników do dodania
```graphql
query {
  usersSearch(input: "jan") {
    id, oauthId
    profile { name, avatarUrl }
  }
}
```
- **Guard:** `JwtAuthGuard`
- Wyklucza siebie z wyników
- Zwraca pustą tablicę dla pustego stringa

---

### Friends Requests — Zaproszenia do znajomych

#### `sendFriendRequest(receiverOauthId)` — wysłanie zaproszenia
```graphql
mutation {
  sendFriendRequest(receiverOauthId: "auth0|456") {
    receiverId
  }
}
```
- **Guard:** `JwtAuthGuard`

#### `acceptFriendRequest(senderOauthId)` — akceptacja zaproszenia
```graphql
mutation {
  acceptFriendRequest(senderOauthId: "auth0|123") {
    receiverId
  }
}
```
- **Guard:** `JwtAuthGuard`

#### `friendsRequests` — lista oczekujących zaproszeń
```graphql
query {
  friendsRequests {
    ownerId, receiverId
    owner { profile { name, avatarUrl } }
  }
}
```
- **Guard:** `JwtAuthGuard`

---

### Friends List — Lista znajomych

#### `friendsList` — lista znajomych zalogowanego użytkownika
```graphql
query {
  friendsList {
    friends {
      id, oauthId
      profile { name, avatarUrl }
    }
  }
}
```
- **Guard:** `JwtAuthGuard`

---

### Friends Activity — Aktywność znajomych

#### `friendsActivity` — ostatnia aktywność znajomych
```graphql
query {
  friendsActivity {
    profile { name, avatarUrl }
    game { name, cover { smallUrl } }
    activityType
    createdAt
  }
}
```
- **Guard:** `JwtAuthGuard`
- Pokazuje ostatnie zmiany statusów gier przez znajomych

---

## Moduł: User Stats

**Cel:** Statystyki użytkownika (np. liczba ukończonych gier wg gatunku/platformy).

### Queries

#### `userStats(type)` — statystyki użytkownika
```graphql
query {
  userStats(type: "genre") {
    label
    value
  }
}
```
- **Guard:** `JwtAuthGuard`
- Parametr `type` określa rodzaj statystyki (np. genre, platform)
- Zwraca tablicę par `label: wartość`

---

## Moduł: Platforms

**Cel:** Zarządzanie platformami sprzętowymi.

### Queries

#### `platforms` — wszystkie platformy
```graphql
query {
  platforms {
    platforms {
      id, name, slug, displayName
    }
  }
}
```
- **Guard:** `JwtAuthGuard`

### Mutations

#### `updatePlatformDisplayName(platformId, displayName)` — zmiana nazwy wyświetlanej platformy
```graphql
mutation {
  updatePlatformDisplayName(platformId: 3, displayName: "PlayStation 5") {
    platform { id, name, displayName }
  }
}
```
- **Guard:** `JwtAuthGuard` + `AdminUserGuard`

---

## Moduł: Images (REST)

**Cel:** Upload i transformacja zdjęć przez Cloudinary.

### POST `/images/upload`

- **Guard:** `JwtAuthGuard` (HTTP)
- **Content-Type:** `multipart/form-data`
- **Max rozmiar pliku:** 25 MB

**Body (form-data):**
```
file: <plik binarny>
transformOptions: {
  width: 200,
  height: 200
}
```

**Odpowiedź:**
```json
{
  "photo_url": "https://res.cloudinary.com/.../upload/w_200,h_200/..."
}
```

- Uploaduje plik do Cloudinary
- Generuje URL z transformacjami rozmiaru (crop/resize)

---

## Moduł: HowLongToBeat Migration (REST)

**Cel:** Import biblioteki gier z eksportu CSV z HowLongToBeat.com.

### POST `/hltb/migrate`

- **Guard:** `JwtAuthGuard` (HTTP)
- **Content-Type:** `multipart/form-data`
- **Max rozmiar pliku:** 25 MB

**Body (form-data):**
```
file: <plik .csv>
```

**Działanie:**
1. Ustawia status migracji na `IN_PROGRESS`
2. Parsuje CSV z danymi konta HLTB
3. Waliduje dane Zod schematem (`HowLongToBeatAccountCsvGamesSchema`)
4. W przypadku błędu walidacji — ustawia status `FAILED`
5. Tworzy zadanie w kolejce Bull (`HowLongToBeatMigrationService`)
6. Zwraca sparsowane dane

### GraphQL: `migrationStatus` — status migracji

```graphql
query {
  migrationStatus {
    status  # WAITING | IN_PROGRESS | FINISHED | FAILED
  }
}
```
- **Guard:** `JwtAuthGuard`

---

## Moduł: HowLongToBeat Parser (wewnętrzny)

**Cel:** Pobieranie danych o grach z HowLongToBeat.com (web scraping).

- Używany wewnętrznie przez moduł `search` i `games`
- Puppeteer do scrapowania strony HLTB
- Pobiera: czas ukończenia (`main`, `mainExtra`, `completionist`), okładki, platformy

---

## Moduł: IGDB (infrastruktura)

**Cel:** Pobieranie danych o grach z IGDB API (Twitch/Amazon).

- Używany przez `games` (upcoming games, okładki)
- Token auth przechowywany w tabeli `IGBDBAuth`
- Auto-refresh tokena przez `@nestjs/schedule`

---

## Paginacja

Wszystkie paginowane query używają wspólnych typów:

**Args (`PaginationArgs`):**
```typescript
take: number   // ile rekordów
skip: number   // offset
```

**Response (`PaginationDTO`):**
```typescript
{
  total: number         // łączna liczba rekordów
  take: number
  skip: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}
```
