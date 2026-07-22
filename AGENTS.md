# Game Critique — Native App Rules

## UI Framework
- Gluestack UI v2 + NativeWind (Tailwind CSS przez `className`)
- **NIE używaj `text-white`** — użyj `text-typography-white` (zdefiniowane w `tailwind.config.js` w `extend.colors.typography.white`)
- Kolory tokenowe: `bg-background-0/50/100`, `text-typography-100/400/white`, `text-primary-500`
- `LinearGradient` z `expo-linear-gradient` — używaj inline `style`, nie `className`
- Gluestack `Image` nadpisuje `style` na webzie — do absolutnego pozycjonowania używaj `Image as RNImage` z `react-native`

## Safe Area
- **ZAWSZE używaj `SafeAreaView` z `edges={['top']}`** dla screenów z własnym headerem (`headerShown: false`)
- NIE używaj `useSafeAreaInsets()` + `paddingTop` jako głównej metody
- `useSafeAreaInsets()` OK tylko do drobnych przesunięć wewnątrz komponentów

## Component Structure
- **Jeden komponent = jeden plik** — nie definiuj wielu komponentów w jednym pliku
- **NIGDY nie używaj barrel exportów** (index.ts re-exportujących z innych plików) — importuj bezpośrednio z pliku źródłowego
- **Eksportuj typy z komponentów** zamiast przez długi chain importów
- Ścieżka: `ui/<category>/<component>/<component>.tsx` lub `modules/<feature>/<component>/<component>.tsx`
- TypeScript interfaces dla propsów

## Code Style
- **NIGDY nie używaj `any`** — zawsze konkretny typ
- **NIGDY `as` castów** dla danych z zewnątrz — używaj Zod `safeParse` lub type guards
- **ZERO komentarzy** w kodzie — jeśli kod wymaga wyjaśnienia, wyciągnij logikę do funkcji z nazwą opisującą co robi
- **Priorytetyzuj auto-generated hooki z `.generated.ts`** — zamiast `useMutation(Document)` używaj wygenerowanego hooka (np. `useRegisterPushTokenMutation` z `xxx.generated.ts`)
- **Zawsze używaj `type` zamiast `interface`** — `type ToggleConfig = { ... }` zamiast `interface ToggleConfig { ... }`
- **Zawsze używaj arrow functions** — `const fn = () => {}` zamiast `function fn() {}`
- **Prisma schema: nowe modele w PascalCase z `@@map` na snake_case** — np. `model DoesItPlayEntry` + `@@map("does_it_play_entry")`
- **Prisma schema: pola w camelCase z `@map` na snake_case** — np. `testedOn String @map("tested_on")`

## Touch & Haptic
- **Touch targets minimum 44pt** (`min-h-[44px]`) na wszystkich klikalnych elementach
- `haptic.light()` na nawigacji, `haptic.medium()` na akcjach zapisu/edycji

## Loading & Error States
- Używaj `Skeleton` zamiast `ActivityIndicator` dla loadingów
- `ErrorState` dla błędów (z `title`, `description`, `onRetry`)
- `EmptyState` dla pustych list

## Navigation
- Expo Router z file-based routingiem
- Stack i tabs layout w `app/`
- `router.push()` dla nawigacji, `router.back()` dla powrotu
- `useLocalSearchParams()` dla odczytu parametrów trasy

## GraphQL
- Apollo Client, operacje w `.graphql` plikach co-located z komponentami
- `useQuery`, `useMutation` z auto-generated hooków
- `skip: !user` dla zapytań wymagających autoryzacji
- Schema: EXPO_PUBLIC_GRAPHQL_ENDPOINT
- Po dodaniu/zmianie `.graphql` pliku, uruchom `yarn generate-graph` w `apps/native/` aby wygenerować hooki i typy

## State Management
- Zustand dla lokalnego stanu
- Apollo Client cache dla stanu serwerowego

## File Naming
- Komponenty: PascalCase (`UserProfile.tsx`)
- GraphQL: snake_case (`verify_user.graphql`)
- Hooki: `use_<name>/` folder z `<name>.generated.ts`
- Utilitki: camelCase (`formatDate.ts`)
- Importy względne dla modułów, absolutne dla ui (`@/ui/...`)

## API — Hexagonal Architecture (CQRS + Ports & Adapters)
- Nowe moduły NestJS trzymaj strukturę **hexagonalną** jak `auth`:
  ```
  <module>/
    <module>.module.ts
    domain/
      models/<model>.model.ts          # Domain model (extends AggregateRoot)
      ports/<repository>.port.ts       # Port interface + DI symbol
    application/
      commands/<action>/<action>.command.ts, <action>.handler.ts
      queries/<action>/<action>.query.ts, <action>.handler.ts
      events/<event>.event.ts          # CQRS events
      handlers/<event>.handler.ts      # @EventsHandler
    infrastructure/
      adapters/prisma-<repository>.ts  # Adapter implements port
      graphql/<resolver>.ts, <dto>.ts, <model>.ts
  ```
- Używaj `RepositoryPort<Entity>` z `libs/ddd/repository.port.ts` jako bazowego interfejsu
- Wstrzykuj przez `@Inject(SYMBOL)` z portu, a w module `{ provide: SYMBOL, useClass: Adapter }`
- `@nestjs/cqrs` Events: definiuj eventy w `application/events/`, handler w `application/handlers/`
- Istniejące moduły (`games_status`, `games`) mogą pozostać przy Pattern B (CQRS bez portów) — nie refaktoruj, tylko nowe moduły pisz hexagonalnie

## API — Krytyczne
- `JwtAuthGuard` wymaga eksportu `CqrsModule` z `AuthModule` dla modułów importujących
- HLTB: `comp_100` = 100% completionist (w sekundach), zaokrąglaj do 0.5h
- `timeToRelative`: argumenty `pluralizePolish(count, singular, few, many)`
- **Prisma `$transaction`**: przy 2+ zapytaniach Prisma w jednej metodzie, gdzie co najmniej jedno robi update/create/delete — zawsze używaj `this.prisma.$transaction(async (tx) => { ... })`
- **Filtrowanie po dacie w Prisma**: używaj `{ gte: dateStart, lt: dateEnd }` w where — nie pobieraj wszystkich rekordów i nie filtruj w JS

## Code Quality
- **ZERO magic numbers** — wszystkie wartości liczbowe (poza 0, 1) wyciągaj do stałych z nazwą opisującą cel

## Testing — NestJS (API)

### Konfiguracja
- Framework: **Jest** (`jest@^29`), transformer: `ts-jest`, rootDir: `src`, testRegex: `.*\.spec\.ts$`
- Uruchamianie: `yarn test:implement` (w `apps/api/`)
- Coverage: `yarn test:cov`
- E2E: `yarn test:e2e` (oddzielna konfiguracja w `test/jest-e2e.json`)

### Wzorce testowania

**1. Pure function tests** — dla funkcji utilowych/extracted logic:
```typescript
import { getWeekNumber } from './weekly_summary.handler';

describe('getWeekNumber', () => {
  it('returns 1 for first week of 2024', () => {
    expect(getWeekNumber(new Date('2024-01-01T12:00:00Z'))).toBe(1);
  });
});
```

**2. Handler tests z mockowanym prisma** — dla CQRS handlerów:
```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../database/prisma.service';

const mockPrisma = {
  profile: { findUnique: jest.fn() },
  gamesStatus: { findMany: jest.fn() },
  notificationPreferences: { findMany: jest.fn() },
  pushToken: { findMany: jest.fn() },
};

describe('GameStatusChangedHandler', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        GameStatusChangedHandler,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: PUSH_TOKEN_REPOSITORY, useValue: mockPushTokenRepo },
        { provide: NOTIFICATIONS_SERVICE, useValue: mockNotificationsService },
      ],
    }).compile();
  });

  it('sends push when friend completes a game', async () => {
    mockPrisma.profile.findUnique.mockResolvedValue({ name: 'Jan' });
    // ... assert
  });
});
```

**3. Service tests z mockowanym fetch** — dla zewnętrznych API:
```typescript
global.fetch = jest.fn();

describe('ExpoNotificationsService', () => {
  it('returns success count from Expo API', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: [{ status: 'ok' }, { status: 'error' }] }),
    });
    const result = await service.sendBulkPush(['tok1', 'tok2'], 'Title', 'Body');
    expect(result).toBe(1);
  });
});
```

### Zasady
- Testy pisz w **ko-lokacji** z implementacją: `file.ts` → `file.spec.ts` w tym samym folderze
- Mockuj tylko bezpośrednie zależności (repository, prisma, fetch) — nie mockuj całego NestJS contextu jeśli nie trzeba
- `Test.createTestingModule` tylko dla handlerów które wymagają DI
- Dla prostych funkcji — pure Jest, bez NestJS testing module
- Każdy test musi być **deterministyczny** — nie używaj `Date.now()` bez mockowania

## Testing — React Native (Frontend)

### Konfiguracja
- Framework: **Jest** (`jest-expo` + `@testing-library/react-native`)
- Plik konfiguracyjny: `jest.config.js` lub `jest.config.ts` w `apps/native/`
- Uruchamianie: `yarn test` (w `apps/native/`)
- Setup: `jest-setup.js` z mockami dla expo modules

### Wzorce testowania

**1. Hook tests** — testuj hooki przez `renderHook` z `@testing-library/react-native`:
```typescript
import { renderHook } from '@testing-library/react-native';
import { useNotificationPreferences } from './use_notification_preferences';

jest.mock('../notifications_graphql/get_notification_preferences.generated', () => ({
  useGetNotificationPreferencesQuery: jest.fn(() => ({
    data: { getNotificationPreferences: { friendActivity: true } },
    loading: false,
    error: undefined,
  })),
}));

describe('useNotificationPreferences', () => {
  it('returns preferences from query', () => {
    const { result } = renderHook(() => useNotificationPreferences());
    expect(result.current.preferences?.friendActivity).toBe(true);
  });
});
```

**2. Component tests** — renderuj komponent i sprawdź output:
```typescript
import { render, fireEvent } from '@testing-library/react-native';

describe('NotificationsSettings', () => {
  it('renders all toggle options', () => {
    const { getByText } = render(<NotificationsSettings />);
    expect(getByText('Aktywność znajomych')).toBeTruthy();
  });
});
```

### Mockowanie expo modules
- `expo-notifications`, `expo-device`, `expo-haptics` — mockuj w `jest-setup.js`
- Apollo Client — mockuj przez `MockedProvider`:
```typescript
import { MockedProvider } from '@apollo/client/testing';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MockedProvider mocks={mocks}>{children}</MockedProvider>
);
```

### Zasady
- Testy w ko-lokacji: `component.tsx` → `component.spec.tsx` w tym samym folderze
- `renderHook` dla hooków, `render` dla komponentów
- Mockuj Apollo queries/mutations przez `MockedProvider` z `@apollo/client/testing`
- Nie testuj implementacji detali — testuj zachowanie (co user widzi, co się dzieje po kliknięciu)
- `fireEvent.press()` dla przycisków, `fireEvent.changeText()` dla inputów