# Web Admin Panel — Dokumentacja funkcji

Aplikacja: **React 18 + Vite + TanStack Router**  
URL deweloperski: `http://localhost:5173`  
Dostęp: tylko użytkownicy z rolą `ADMIN`

---

## Autentykacja

### Strona logowania (`/`)

- Komponent: `src/features/auth/auth_page.tsx`
- Używa **Auth0 React SDK** (`@auth0/auth0-react`)
- Przycisk "Login" przekierowuje do Auth0 Universal Login
- Po zalogowaniu:
  1. `useSetAccessToken` zapisuje JWT token w TanStack Query cache (klucz: `['auth', 'session_token']`)
  2. Wywołuje mutation `verify` (GraphQL) — tworzy konto jeśli nie istnieje lub zwraca dane istniejącego
  3. Sprawdza rolę: jeśli brak roli `ADMIN` → blokuje dostęp do panelu
- Loader `UserAuthenticatingLoader` wyświetla spinner podczas weryfikacji

### Wylogowanie

- Przycisk "Logout" w sidebar (dolna część)
- Używa `logout()` z Auth0 SDK

---

## Layout i nawigacja

### Sidebar (`AppSidebar`)

Zawsze widoczny po lewej stronie po zalogowaniu. Sekcje:

| Sekcja | Linki |
|---|---|
| **Dashboard** | Home (`/admin`) |
| **Users** | Search Users, Search User Games |
| **Games** | Search Games |
| **Resources** | Platforms |
| **Migrations** | Migrations (link widoczny, strona w planach) |
| **Actions** | Logout |

---

## Widoki Admin Panelu

### Dashboard (`/admin`)

- Prosta strona powitalna
- Placeholder: `"Hello /admin/!"`
- Do rozbudowania w przyszłości

---

### Zarządzanie użytkownikami (`/admin/users`)

**Komponent:** `UsersPage` → `UsersDataTable`

**Funkcje:**
- Wyświetla tabelę wszystkich użytkowników w systemie
- Kolumny: ID, oauthId, nazwa profilu, avatar, rola
- Każdy wiersz ma menu akcji (dropdown)

#### Zmiana roli użytkownika

Dostępna przez dropdown w wierszu tabeli (`TableDropdownUserActions`).

1. Kliknij menu akcji przy użytkowniku
2. Wybierz "Edit Role" → otwiera się `EditRoleDialog`
3. W dialogu: formularz z select'em ról (`EditRoleForm`)
4. Walidacja Zod (`edit_role_form_schema.ts`)
5. Po zatwierdzeniu: mutation `updateUserRole` (GraphQL)
6. Toast z informacją o sukcesie/błędzie

**GraphQL query:** `users` (pobiera listę)  
**GraphQL mutation:** `updateUserRole`

---

### Zarządzanie grami (`/admin/games`)

**Komponent:** `GamesList` → `GamesListTable`

**Funkcje:**
- Formularz wyszukiwania po nazwie gry (pole tekstowe)
- Tabela gier z paginacją (TanStack Table)
- Dane filtrowane w czasie rzeczywistym po wpisaniu nazwy

#### Aktualizacja danych gry

Dostępna przez akcję w wierszu tabeli (`GamesListRowActionUpdateGame`).

1. Kliknij przycisk aktualizacji przy grze
2. Wywołuje mutation `updateGameData(hltbId)` (tylko admin)
3. Backend uruchamia `UpdateGameDataCommand` — scrapuje aktualne dane z HLTB/IGDB
4. Toast z potwierdzeniem

**GraphQL query:** `games(search, take, skip)` — paginacja i filtrowanie  
**GraphQL mutation:** `updateGameData(hltbId)`

---

### Zarządzanie statusami gier użytkowników (`/admin/user-games`)

**Komponent:** `UserGames` → `UserGamesSearch`

**Funkcje:**
- Formularz wyszukiwania:
  - Pole: `oauthId` użytkownika (wymagane do wyświetlenia danych)
  - Checkbox: "Group duplicated entries" — grupuje duplikaty statusów tej samej gry
- Przycisk "Refresh" — odświeża listę (`RefreshUserGamesStatusListButton`)
- Tabela statusów gier wybranego użytkownika (`UserGamesTableData`)

#### Tabela statusów

Kolumny zdefiniowane w `use_get_user_games_table_columns.tsx`:
- Nazwa gry, platforma, status, ocena, recenzja, czas ukończenia
- Kolumna akcji

#### Usunięcie statusu gry (przez admina)

Akcja: `DeleteGameStatusAction` → `DeleteGameStatusDialog`

1. Kliknij ikonę usunięcia przy statusie
2. Otwiera się dialog potwierdzenia `DeleteGameStatusDialog`
3. Po potwierdzeniu: mutation `removeUserGameStatusByUserOauthId`
4. Lista automatycznie się odświeża (TanStack Query invalidation)

**GraphQL query:** `getAllUserGamesStatusByOauthId(oauthId)`  
**GraphQL mutation:** `removeUserGameStatusByUserOauthId(gameStatusId, oauthId)`

---

### Zarządzanie platformami (`/admin/resources/platforms`)

**Komponent:** `ResourcePlatformsContent`

**Funkcje:**
- Tabela wszystkich platform w systemie (z paginacją)
- Kolumny: ID, Platform Name, Display Name, akcje

#### Zmiana nazwy wyświetlanej platformy

Akcja: `PlatformActions` → `PlatformDisplayNameModal`

1. Kliknij przycisk akcji przy platformie
2. Otwiera się modal z formularzem
3. Wpisz nową nazwę wyświetlaną (`displayName`)
4. Po zapisaniu: mutation `updatePlatformDisplayName(platformId, displayName)`
5. Lista automatycznie się odświeża

> **Uwaga:** `displayName` to przyjazna dla użytkownika nazwa wyświetlana w aplikacji mobilnej, np. "PlayStation 5" zamiast "ps5".

**GraphQL query:** `platforms`  
**GraphQL mutation:** `updatePlatformDisplayName`

---

## Komponenty UI

Panel administracyjny używa własnej biblioteki komponentów w `src/packages/ui/`:

| Kategoria | Komponenty |
|---|---|
| **Data Display** | `DataTable` (TanStack Table), `DataTablePagination`, `Separator`, `Table`, `Tooltip` |
| **Feedback** | `Dialog`, `Skeleton`, `Toast` / `Toaster` |
| **Inputs** | `Button`, `Checkbox`, `Form` (React Hook Form integration), `Input`, `Label`, `Select` |
| **Navigation** | `Dropdown`, `Sidebar` (Radix UI based) |
| **Surfaces** | `Card`, `Collapsible`, `Sheet` |
| **Typography** | `Text` |

### DataTable

Wielokrotnego użytku tabela danych (`src/packages/ui/data_display/data_table/`):
- Oparta na **TanStack Table v8**
- Wbudowana paginacja (`DataTablePagination`)
- Przyjmuje `columns: ColumnDef<T>[]` i `data: T[]`
- Parametr `withPagination?: boolean`

### Toast / Toaster

System powiadomień (`use-toast.ts` + `Toaster`):
- Globalne toasty dostępne przez hook `useToast()`
- Błędy GraphQL są automatycznie wyświetlane jako toast (przez `useCustomQueryClient`)

---

## GraphQL i generowanie typów

### Przepływ

1. Piszesz operację w pliku `.graphql` (np. `users.graphql`)
2. Uruchamiasz `yarn generate-codegen-dev`
3. Generator tworzy plik `.generated.ts` z typami TypeScript i hookiem TanStack Query
4. Importujesz hook w komponencie

### Fetcher

`src/codegen/fetcher.ts` — niestandardowy fetcher dla GraphQL Code Generator:
- Wysyła requesty na `http://localhost:3001/graphql` (dev) lub zmienną środowiskową
- Automatycznie dołącza JWT token z cache TanStack Query (`['auth', 'session_token']`)

### Przykład generated hooka

```typescript
// users.graphql
query Users {
  users {
    id
    oauthId
    profile { name, avatarUrl }
    role
  }
}

// → users.generated.ts (auto)
export const useUsersQuery = () =>
  useQuery({
    queryKey: ['Users'],
    queryFn: fetcher<UsersQuery>(UsersDocument),
  });
```

---

## Obsługa błędów

### GraphQL błędy

`src/packages/graphlql_errors/parse_graphql_errors.ts` — parser błędów GraphQL  
`src/packages/tanstack_query/use_custom_query_client/` — globalny handler błędów:
- Automatycznie pokazuje toast z komunikatem błędu przy każdym nieudanym requeście
- `get_error_toast_body.ts` — formatuje treść toastu

### Własne błędy

`src/packages/error_handling/custom_errors.ts` — definicje niestandardowych typów błędów

---

## Komendy deweloperskie

```bash
# Uruchom serwer deweloperski
cd apps/web
yarn dev

# Wygeneruj typy GraphQL
yarn generate-codegen-dev

# Build produkcyjny
yarn build
```

---

## Zmienne środowiskowe

| Zmienna | Opis |
|---|---|
| `VITE_AUTH0_DOMAIN` | Domena Auth0 |
| `VITE_AUTH0_CLIENT_ID` | Client ID Auth0 |
| `VITE_AUTH0_AUDIENCE` | Audience Auth0 |
| `VITE_GRAPHQL_URL` | URL GraphQL API |
