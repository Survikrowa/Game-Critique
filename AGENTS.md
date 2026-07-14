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
- **ZERO komentarzy** w kodzie — jeśli kod wymaga wyjaśnienia, wyciągnij logikę do funkcji z nazwą opisującą co robi

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

## Code Quality
- **ZERO magic numbers** — wszystkie wartości liczbowe (poza 0, 1) wyciągaj do stałych z nazwą opisującą cel