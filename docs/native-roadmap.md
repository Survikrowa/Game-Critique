# Game Critique — Roadmapa rozwoju aplikacji mobilnej

> Dokument ten opisuje planowane kierunki rozwoju aplikacji native (Expo / React Native).
> Każda inicjatywa zawiera motywację, szczegółowy opis UX, zakres zmian w kodzie
> oraz szacunkowy nakład pracy.
>
> **Kontekst użytkowników:** mix typów graczy (casual, completionist, backlog hunter),
> głównie konsole (PS/Xbox/Switch), wejście ~raz na tydzień po aktualizację statusów.

---

## Spis treści

0. [🔨 W toku: Rewrite UI na Gluestack](#0-w-toku-rewrite-ui-na-gluestack)
1. [Quick Add — błyskawiczne dodawanie i zmiana statusów](#1-quick-add--błyskawiczne-dodawanie-i-zmiana-statusów)
2. [System powiadomień push](#2-system-powiadomień-push)
3. [Gaming Wrapped i rozszerzone statystyki](#3-gaming-wrapped-i-rozszerzone-statystyki)
4. [Social Light — reakcje i porównania](#4-social-light--reakcje-i-porównania)
5. [Recommendation Strip — "co zagrać dalej"](#5-recommendation-strip--co-zagrać-dalej)
6. [Premiery i Obserwowane — kalendarz wydań po platformie](#6-premiery-i-obserwowane--kalendarz-wydań-po-platformie)
7. [Oceny zewnętrzne — Metacritic i OpenCritic](#7-oceny-zewnętrzne--metacritic-i-opencritic)
8. [Wersja webowa dla użytkowników](#8-wersja-webowa-dla-użytkowników)
9. [Linki do guide'ów z trofeami i osiągnięciami](#9-linki-do-guidów-z-trofeami-i-osiągnięciami)

---

## 0. 🔨 W toku: Rewrite UI na Gluestack

> **Status: AKTUALNIE W TOKU** — nie jest to przyszła inicjatywa, lecz fundament pod cały dalszy rozwój.

### Co i dlaczego

Całe UI aplikacji native jest przepisywane na **Gluestack UI** — komponentową bibliotekę dla React Native opartą na NativeWind (Tailwind dla RN). Zastępuje dotychczasowy Tamagui.

**Dlaczego to ważne dla roadmapy:**
- Wszystkie nowe ekrany i komponenty opisane w inicjatywach 1–7 będą budowane na Gluestack
- Spójność designu bez custom-styled komponentów
- Lepsza dostępność (a11y) out-of-the-box
- Szybszy development nowych UI dzięki gotowym prymitywom (Button, Card, Badge, Sheet, etc.)

### Co się zmienia

| Obszar | Przed | Po |
|---|---|---|
| Komponenty bazowe | Tamagui `Stack`, `Text`, `Button` | Gluestack `Box`, `Text`, `Button` |
| Stylowanie | Tamagui tokens + styled() | NativeWind utility classes |
| Motywy | `createTamagui()` | Gluestack config + Tailwind theme |
| Formularze | Tamagui Input | Gluestack FormControl + Input |
| Sheets / Modals | Tamagui Sheet | Gluestack ActionSheet / Modal |

### Wpływ na kolejne inicjatywy

Wszystkie nowe komponenty w inicjatywach 1–7 **muszą używać Gluestack** zamiast Tamagui. Warto poczekać na zakończenie core rewrite przed implementacją złożonych nowych ekranów (szczególnie #3 Statystyki i #6 Premiery).

---

## 1. Quick Add — błyskawiczne dodawanie i zmiana statusów

### Motywacja

Dziś dodanie gry wymaga **7 kroków i 6 pól w formularzu**:

```
FAB "Dodaj nową grę"
  → /games/games_search (pole wyszukiwania)
    → wyniki z HLTB API
      → kliknięcie gry → GameScreen (ładowanie danych)
        → zakładka "Dodaj status"
          → formularz: Status + Czas (H/M/S) + Platforma + Osiągnięcia + Ocena + Recenzja
            → przycisk "Zapisz"
```

Dla gracza który właśnie ukończył grę na PS5 i chce to szybko oznaczyć — to za dużo tarcia.

---

### 1.1 Swipe-to-change-status na karcie gry (lista)

**Wzorzec:** `CollectionCard` już używa `Swipeable` z `react-native-gesture-handler`. Ten sam mechanizm można zastosować na `GamesStatusListItem`.

**UX:**
- Swipe w prawo → otwiera szybki panel zmiany statusu (4 przyciski: ✅ COMPLETED / ▶️ IN_PROGRESS / 📋 BACKLOG / ❌ RETIRED)
- Swipe w lewo → usuń (jak dziś przez Sheet)
- Bez otwierania żadnego formularza — jeden tap po swipe

```
[okładka]  [tytuł gry]  [platforma]
←── swipe left: usuń ──          ── swipe right: zmień status ──→
                                    [ ✅ ] [ ▶️ ] [ 📋 ] [ ❌ ]
```

**Zmiany w kodzie:**
- `modules/screens/games/games_status_list/games_status_list_item/games_status_list_item.tsx`
  — owinąć w `Swipeable`, dodać `renderRightActions`
- Nowy komponent `quick_status_actions/quick_status_actions.tsx`
  — 4 przyciski wywołujące `upsertGameStatus` z `isEditing: true`
- Hook `use_quick_update_status.ts` — mutacja Apollo z optymistycznym update

---

### 1.2 "Quick Complete" — uproszczony formularz

Gdy gracz chce oznaczyć grę jako ukończoną — najważniejsze to:
1. Czas gry (opcjonalnie)
2. Ocena (opcjonalnie)
3. Osiągnięcia (checkbox — dotyczy PS/Xbox)

**UX:**
- Z długiego formularza wydzielić **"Tryb szybki"** (domyślny) i **"Tryb szczegółowy"** (klik "więcej opcji")
- Tryb szybki: 3 pola + przycisk Zapisz — wszystko na jednym ekranie bez scrollowania
- Platforma: auto-select jeśli gra ma 1 platformę; jeśli ma wiele — pokaż tylko ten picker

**Zmiany w kodzie:**
- `modules/games_status/games_status_form/games_status_form.tsx`
  — dodać state `isQuickMode: boolean` (domyślnie `true`)
  — warunkowo renderować sekcje: w quick mode tylko status + platforma + czas + ocena + osiągnięcia
  — link "Pokaż więcej opcji" do rozwinięcia recenzji i innych pól
- `use_games_status_form.ts` — `review` opcjonalne (już jest), wystarczy schować pole w UI

---

### 1.3 "Gram teraz" — one-tap z karty gry

Na ekranie szczegółów gry (`GameScreen`) dodać sticky przycisk na dole:

```
┌─────────────────────────────────────────────┐
│  [okładka]  Elden Ring                      │
│  Akcja/RPG  •  2022  •  PS5, Xbox, PC       │
│  ⏱ ~55h main  ~95h completionist           │
│  ─────────────────────────────────────────  │
│  [Twój znajomy Jan: 9/10 ★★★★★]            │
└─────────────────────────────────────────────┘
                                               
  [  ▶️ Gram teraz  ]  [ + Dodaj do backlogu ]
```

- **"Gram teraz"** → od razu ustawia `IN_PROGRESS` dla wybranej platformy (jeśli jedna — bez pytania; jeśli więcej — bottom sheet z wyborem platformy — max 2 tapy)
- **"Dodaj do backlogu"** → ustawia `BACKLOG` — zero formularza, jeden tap

**Zmiany w kodzie:**
- `modules/screens/game/game_screen.tsx` — dodać sticky footer z 2 przyciskami
- Nowy hook `use_quick_add_game_status.ts`
  — sprawdza czy status już istnieje (zapobiega duplikatom)
  — jeśli tak → toasts "Już masz tę grę na liście — edytować?"
  — wywołuje `upsertGameStatus` z minimalnymi polami

---

### 1.4 Smart defaults dla graczy konsolowych

- Zapamiętaj ostatnio wybraną platformę (`AsyncStorage` / Zustand persist)
- Przy kolejnym dodaniu gry — platforma pre-selectowana
- Dla PS/Xbox exclusive — auto-detect jedynej platformy
- **Obsługa nowego sprzętu:** jeśli gra była dostępna na Switch ale user gra na Switch 2 — picker pokazuje obie opcje bez usuwania starszej wersji. Analogicznie PS5 Pro jako osobna pozycja przy logowaniu czasu.

**Zakres:** `use_games_status_form.ts` + `AsyncStorage` persist + upewnić się że tabela `Platform` w Prisma zawiera wpisy dla nowych konsol (Switch 2, PS5 Pro)

---

### Szacunek nakładu (1. Quick Add)

| Zadanie | Złożoność |
|---|---|
| Swipe actions na liście | Średnia (3-4 dni) |
| Quick Complete formularz | Mała (1-2 dni) |
| One-tap z GameScreen | Mała (1-2 dni) |
| Smart defaults | Minimalna (0.5 dnia) |

---

## 2. System powiadomień push

### Motywacja

Aplikacja nie daje dziś **żadnego powodu do wejścia poza własną inicjatywą**.
Przy tygodniowym rytmie korzystania — brak powiadomień = brak nawyku = churn.

Powiadomienia nie mogą być nachalnie — muszą dostarczać wartość:
*"Twój znajomy właśnie ukończył grę którą masz w backlogu"* — to jest ciekawe.
*"Nie logowałeś się od 7 dni"* — to jest irytujące.

---

### 2.1 Typy powiadomień

#### Powiadomienia społecznościowe (najwyższy engagement)

| Trigger | Treść | Warunek |
|---|---|---|
| Znajomy ukończył grę | *"Jan ukończył Elden Ring i dał 9/10"* | Masz tę grę w backlogu/w trakcie |
| Znajomy dodał grę do IN_PROGRESS | *"Maria zaczęła grać w Hogwarts Legacy"* | Masz tę grę |
| Znajomy ocenił grę | *"Jan ocenił Cyberpunk 2077 — 8/10"* | Zawsze (każda ocena od znajomego) |
| Znajomy napisał recenzję | *"Anna napisała recenzję God of War Ragnarök"* | Zawsze — zachęca do przeczytania |
| Znajomy przyjął zaproszenie | *"Tomek zaakceptował Twoje zaproszenie!"* | Zawsze |
| Nowe zaproszenie do znajomych | *"Anna chce Cię dodać do znajomych"* | Zawsze |

#### Powiadomienia o grach (retencja tygodniowa)

| Trigger | Treść | Częstotliwość |
|---|---|---|
| Nadchodzi premiera gry z backloga | *"Za 3 dni premiera: GTA 6 — masz ją w backlogu!"* | Jednorazowo |
| Tygodniowe podsumowanie | *"Tydzień 28 • Zagrałeś 8h • 1 gra ukończona"* | Raz na tydzień (poniedziałek 18:00) |
| Długi backlog — przypomnienie | *"Masz 47 gier w backlogu. Może czas zagrać w coś?"* | Max raz na 2 tygodnie |

#### Powiadomienia o aktywności (engagement drive)

| Trigger | Treść |
|---|---|
| Streak zagrożony | *"Nie aktualizowałeś listy gier od 14 dni — Twój streak się resetuje"* |
| Znajomy napisał recenzję gry którą masz | *"Jan napisał recenzję gry którą właśnie kończysz"* |

---

### 2.2 Architektura techniczna

**Stack:**
- `expo-notifications` — obsługa push na iOS i Android
- `expo-device` — już zaimplementowane w projekcie
- Expo Push Notification Service (EPNS) — free tier, 0 konfiguracji po stronie serwera
- Backend: nowy moduł `notifications` w NestJS

**Przepływ:**

```
1. Przy pierwszym logowaniu app → pobierz Expo Push Token
2. Wyślij token do API: POST /api/notifications/register
3. Backend zapisuje token powiązany z oauthId
4. Przy triggerach (zmiana statusu, akceptacja zaproszenia) →
   API wysyła push przez Expo Push API
5. Kliknięcie powiadomienia → deeplink do odpowiedniego ekranu
```

**Nowy endpoint API:**
```typescript
// POST /api/notifications/register
body: { expoPushToken: string }

// Nowy moduł: modules/notifications/
// notifications.service.ts — wysyłanie przez Expo Push API
// notifications.repository.ts — zapis tokenów w nowej tabeli Prisma
```

**Nowa tabela Prisma:**
```prisma
model PushToken {
  id        Int      @id @default(autoincrement())
  oauthId   String   @map("oauth_id")
  token     String   @unique
  platform  String   // "ios" | "android"
  createdAt DateTime @default(now())
  user      User     @relation(fields: [oauthId], references: [oauthId])
  @@map("push_tokens")
}
```

**Triggery w istniejących modułach:**
- `games_status.service.ts` → po `upsertGameStatus` → sprawdź czy znajomi mają tę grę → wyślij push
- `friends_requests.service.ts` → po `acceptFriendRequest` → wyślij push do obu stron
- Nowy `@Cron` w `tasks.service.ts` → co poniedziałek → wyślij weekly summary

---

### 2.3 Ustawienia powiadomień w aplikacji

Ekran w Profilu (nowa sekcja "Powiadomienia"):
- Toggle: aktywność znajomych ON/OFF
- Toggle: premiery gier ON/OFF
- Toggle: tygodniowe podsumowanie ON/OFF
- Toggle: zaproszenia do znajomych ON/OFF (zawsze domyślnie ON)

---

### Szacunek nakładu (2. Powiadomienia)

| Zadanie | Złożoność |
|---|---|
| Rejestracja tokenów (app + API) | Mała (1-2 dni) |
| Triggery w istniejących serwisach | Średnia (3-4 dni) |
| Weekly summary cron | Mała (1 dzień) |
| Settings screen w appce | Mała (1 dzień) |
| Deeplinki po kliknięciu | Mała (1 dzień) |

---

## 3. Gaming Wrapped i rozszerzone statystyki

### Motywacja

Statystyki to jeden z najlepszych powodów do powrotu do aplikacji.
Dziś to tylko 3 wykresy (platformy / oceny / rok wydania) bez kontekstu.

Spotify Wrapped stał się fenomenem kulturowym — gracze też chcą wiedzieć "ile zagrałem w tym roku".

---

### 4.1 Dashboard statystyk — przeprojektowanie

**Obecny stan:** jeden ekran z jednym wykresem słupkowym i 3 przyciskami.

**Nowy układ — sekcje na scrollowalnym ekranie:**

```
┌──────────────────────────────┐
│  📊 Twoje statystyki 2025    │
├──────────────────────────────┤
│  Podsumowanie roku           │
│  ┌────┐ ┌────┐ ┌────┐       │
│  │ 48 │ │127h│ │8,2 │       │
│  │gier│ │gry │ │avg │       │
│  └────┘ └────┘ └────┘       │
├──────────────────────────────┤
│  Aktywność miesięczna        │
│  [wykres liniowy / heatmap]  │
├──────────────────────────────┤
│  Top platformy               │
│  [wykres kołowy / słupkowy]  │
├──────────────────────────────┤
│  Rozkład ocen                │
│  [histogram 1-10]            │
├──────────────────────────────┤
│  Backlog progress            │
│  [ring chart: ukończone vs   │
│   dodane w tym roku]         │
└──────────────────────────────┘
```

**Nowe metryki (wymagają obliczeń po stronie backendu lub klienta):**

| Metryka | Źródło danych |
|---|---|
| Łączna liczba gier na liście | `GamesStatus.count()` |
| Łączny czas zagrany | Suma `completedIn` (h/m/s) |
| Średnia ocena | Średnia `score` z wpisów z oceną |
| Ukończone w tym roku | `GamesStatus` z `status=COMPLETED` + `updatedAt >= year_start` |
| Dodane do backlogu w roku | `GamesStatus` z `status=BACKLOG` + `createdAt >= year_start` |
| Aktywność miesięczna | Grupowanie `updatedAt` po miesiącach |
| Najdłuższa seria w roku | Analiza `UserActivity` po dniach |

**Zmiany w API:**
- `user_stats.service.ts` — nowe typy zapytań: `yearly_summary`, `monthly_activity`, `backlog_ratio`, `completion_time_total`
- Backend może zwracać gotowe agregaty zamiast raw danych

---

### 4.2 Gaming Wrapped — roczne podsumowanie

Dostępne od 1 grudnia każdego roku. Format: **seria kart z animacjami** (swipe przez kolejne "slajdy").

**Slajdy:**

1. **"Twój rok 2025"** — duży tytuł + tło z collage okładek
2. **"Zagrałeś w X gier"** — animowany licznik
3. **"Twoja suma to X godzin"** — przeliczone na dni (*"To jak 5,3 nocy bez snu"*)
4. **"Twoja platforma nr 1: PlayStation 5"** — z ikoną
5. **"Twój gatunek nr 1: Akcja/RPG"** — top 3 gatunki
6. **"Twoja gra roku: Elden Ring"** — gra z najwyższą oceną lub ostatnia ukończona
7. **"Ukończyłeś backlog w X%"** — ile gier z backloga zagrałeś
8. **"Twój znajomy X grał podobnie"** — social twist na koniec
9. **"Udostępnij swój rok"** — screenshot do social media

**Implementacja:**
- Widok na ekranie Profilu lub HomeScreen (baner "Twój 2025 jest gotowy!")
- Używa `expo-sharing` do udostępniania screenshota (Expo już w projekcie)
- Animacje przez `moti` (już w projekcie)

---

### 4.3 Streak — seria aktywności

Prosta gamifikacja która buduje nawyk:

```
🔥 12  ← tygodnie z rzędu
   Aktualizujesz listę gier
```

- Streak tygodniowy (nie dzienny — zbyt nachalny dla tygodniowych użytkowników)
- Wyświetlany na stronie głównej i w profilu
- Powiadomienie gdy streak zagrożony (patrz punkt 2)

**Implementacja:**
- Wyliczany na froncie z danych `UserActivity` (grupowanie po tygodniach ISO)
- Lub nowy endpoint: `userStats(type: "streak")` → backend liczy

---

### 4.4 "Czas ukończenia vs HLTB" — personalne porównanie

Na widoku statusu ukończonej gry:
```
⏱ Twój czas: 67h 30m
📊 HLTB Main Story: 55h
📊 HLTB Completionist: 95h
→ Grałeś o 12h dłużej niż przeciętny gracz (main story)
→ Jesteś w 71% do 100%
```

Dane HLTB już są w `GameCompletionTime`. Wystarczy porównanie w UI.

---

### 4.5 Fix: skrócone nazwy gier w statystykach (UX)

**Problem zgłoszony przez użytkownika:** Na ekranie statystyk nazwy gier są przycinane (np. "Play..." zamiast pełnego tytułu) i nie można kliknąć żeby rozwinąć. Gracz chce sprawdzić konkretną grę, ale nie może jej odczytać.

**Rozwiązanie:**

```
Obecny stan:
│  Play...     ████████ 67h
│  Play...     ████  32h

Nowy stan (tap żeby rozwinąć / tooltip):
│  [Play...] ← tap → wyskakuje tooltip z pełną nazwą
│  LUB: poziome scrollowanie samego labela (marquee)
│  LUB: skrót wyświetla np. 25 znaków zamiast 8
```

Opcje implementacji (od najprostszej):
1. Zwiększyć `numberOfLines` i `ellipsizeMode` + `flexShrink` w komponencie wykresu — 30 min
2. Dodać `onPress` na label → `Alert.alert` z pełną nazwą — 1h
3. Zastąpić skrót numerem kolejności + legenda pod wykresem — 2h

**Zakres:** komponent wykresu w `modules/screens/stats/` — prawdopodobnie `react-native-gifted-charts` konfiguracja labeli

---

### Szacunek nakładu (3. Statystyki)

| Zadanie | Złożoność |
|---|---|
| Nowe metryki w API (aggregacje) | Średnia (3-4 dni) |
| Przeprojektowanie ekranu statystyk | Średnia (2-3 dni) |
| Gaming Wrapped (animacje + slajdy) | Duża (5-7 dni) |
| Streak component | Mała (1-2 dni) |
| HLTB vs personal comparison | Minimalna (0.5 dnia) |
| Fix skróconych nazw (UX) | Minimalna (0.5 dnia) |

---

## 4. Social Light — reakcje i porównania

### Motywacja

Pełny social (komentarze, polubienia, feed publiczny) to ogromny nakład.
"Social Light" to drobne elementy które budują poczucie wspólnoty bez budowania sieci społecznościowej od zera.

Użytkownicy już mają znajomych, już widzą ich aktywność — trzeba to wzmocnić.

---

### 5.1 Reakcje na aktywność znajomych

Na karcie aktywności znajomego (Home screen, sekcja "Aktywność znajomych"):

```
┌─────────────────────────────────┐
│  [avatar] Jan ukończył          │
│  Cyberpunk 2077 • 9/10          │
│  2 godziny temu                 │
│  ────────────────────────────   │
│  👏  🔥  😮  🎮                 │
│  [Wpisz komentarz...]           │  ← opcjonalnie, v2
└─────────────────────────────────┘
```

**Implementacja:**
- 4 emoji-reakcje (bez likes jako liczby — zbyt presja społeczna)
- Nowa tabela `GameStatusReaction` w Prisma
- Powiadomienie do znajomego gdy dostaje reakcję
- Emoji: 👏 (brawo) / 🔥 (fire) / 😮 (wow) / 🎮 (graliśmy razem?)

---

### 5.2 "3 Twoich znajomych grało w tę grę" — na GameScreen

Sekcja na dole ekranu szczegółów gry:

```
┌──────────────────────────────────────┐
│  👥 Znajomi którzy grali w tę grę   │
│  ────────────────────────────────   │
│  [avatar Jan] Jan • 9/10 • ✅       │
│  [avatar Anna] Anna • W trakcie     │
│  [avatar Piotr] Piotr • 7/10 • ✅  │
│                                      │
│  Średnia znajomych: 8.0/10          │
│                                      │
│  ──── Społeczność ────               │
│  👤 Karolina • 10/10 • ✅  recenzja │
│  👤 Marek • 8/10 • ✅               │
│  👤 Zofia • 6/10 • ✅               │
│  [Pokaż więcej — 42 oceny]          │
└──────────────────────────────────────┘
```

Dane znajomych już istnieją (`ownerAndFriendsGameStatusReviews`). Sekcja "Społeczność" to nowy query — wszyscy użytkownicy appki którzy ukończyli tę grę (poza znajomymi), posortowani po dacie lub ocenie. To buduje poczucie że appka ma aktywną bazę userów.

**Zmiany w API:**
- Nowy query: `communityGameReviews(hltbId: Int!, take: Int, skip: Int)` — publiczne oceny/statusy dla gry
- Wystarczy zapytanie Prisma filtrowane po `hltbId` + `score IS NOT NULL` + wykluczenie self + opcjonalnie znajomi osobno

---

### 5.3 Porównanie z znajomym — "Head to Head"

Na profilu znajomego — przycisk "Porównaj":

```
┌──────────────────────────────────────────┐
│  Ty vs Jan                               │
│  ────────────────────────────────────    │
│  Gry ukończone:    48  vs  62            │
│  Łączny czas:     320h vs 410h           │
│  Wspólne gry:      12 gier               │
│  Avg ocena:        7.8 vs 8.1            │
│  Backlog:          34  vs  21            │
│                                          │
│  🎮 Wspólne gry                          │
│  [Elden Ring] [Cyberpunk] [Baldur's]...  │
└──────────────────────────────────────────┘
```

**"Wspólne gry"** — osobna sekcja: gry które obydwoje macie na listach (ukończone, w trakcie lub backlog).

**Implementacja:**
- Nowy query w API: `compareWithFriend(friendOauthId)` → zwraca agregaty obu użytkowników
- Lub: frontend oblicza z istniejących danych (userGamesStatus obu użytkowników)

---

### 5.4 "Zaproś do zagrania" — wezwanie do akcji między znajomymi

Na profilu znajomego lub przy jego aktywności:

```
Jan zaczął grać w Elden Ring
[🎮 Dodaj do backlogu i grajcie razem]
```

Jeden tap → dodaje grę do backlogu zalogowanego użytkownika.

---

### 5.5 Timestampy na aktywności znajomych

Dziś feed aktywności nie pokazuje kiedy coś się stało.

**Zmiana:** dodać względny czas ("2 godziny temu", "wczoraj", "3 dni temu") używając istniejącej funkcji `format_date_to_relative_text.ts` która **już istnieje** w `apps/api/src/modules/dates/`.

Na frontendzie — użyć biblioteki `date-fns` (już w projekcie przez Expo) lub własnej logiki.

---

### 5.6 Klikalna gra w feedzie aktywności → GameScreen

**Problem zgłoszony przez użytkownika:** gdy widzisz w feedzie "Jan ukończył Cyberpunk 2077", chcesz kliknąć na tę grę i przejść do jej szczegółów — ale tap na tytuł nic nie robi.

**Rozwiązanie:** każda wzmianka o grze w `ActivityFeedItem` powinna być `Pressable` linkującym do `GameScreen`.

```
[avatar Jan]  Jan ukończył
              [→ Cyberpunk 2077] ← tap → GameScreen(hltbId)
              9/10 • 2 godziny temu
```

**Zakres:**
- `modules/screens/home/activity_feed/activity_feed_item.tsx` — owinąć nazwę gry w `Pressable`
- Nawigacja: `router.push('/game/' + hltbId)` (Expo Router)
- Upewnić się że `hltbId` jest zwracany w query aktywności (`ownerAndFriendsGameStatusReviews`)

---

### Szacunek nakładu (4. Social Light)

| Zadanie | Złożoność |
|---|---|
| Emoji reakcje (model + UI) | Średnia (3-4 dni) |
| Znajomi + społeczność na GameScreen | Mała (1-2 dni) |
| Head to Head comparison | Średnia (3-4 dni) |
| "Zaproś do zagrania" CTA | Mała (1 dzień) |
| Timestampy w aktywności | Minimalna (0.5 dnia) |
| Klikalna gra w feedzie → GameScreen | Minimalna (0.5 dnia) |

---

## 5. Recommendation Strip — "co zagrać dalej"

### Motywacja

Po ukończeniu gry — user otwiera aplikację, aktualizuje status i... co dalej?
Aplikacja powinna odpowiedzieć: *"Skoro ukończyłeś Elden Ring, może zainteresuje Cię Sekiro?"*

To najtrudniejsza technicznie inicjatywa, ale daje ogromną długoterminową wartość.

---

### 7.1 Rekomendacje oparte na gatunkach

Najprostszy algorytm — nie wymaga ML:

```
1. Weź 5 ostatnio ukończonych gier użytkownika
2. Sprawdź ich gatunki (np. Action RPG, Soulslike)
3. Znajdź gry w bazie z tymi samymi gatunkami
4. Wyklucz gry które user już ma na liście
5. Zwróć top 5 posortowane po: ocena znajomych → popularność HLTB
```

**Query API:**
```graphql
query {
  recommendedGames(limit: 5) {
    id, name, hltbId
    cover { smallUrl }
    genres { name }
    averageFriendsScore  # nowe pole
  }
}
```

---

### 7.2 "Twoi znajomi też grali w X"

Silniejsza rekomendacja niż algorytmiczna:

```
Ukończyłeś Elden Ring
→ 3 Twoich znajomych po Elden Ring grało w Sekiro (najczęstszy "next game")
→ "Jan, Anna i Piotr polecają Sekiro po Elden Ring"
```

Implementacja: query do bazy — *"Co grali znajomi użytkownika w ciągu 30 dni po ukończeniu tej gry?"*

---

### 7.3 Placement na Home Screen

```
┌─────────────────────────────────────────┐
│  📅 Twoje ostatnie zmiany               │
│  [carousel gier]                        │
├─────────────────────────────────────────┤
│  🎮 Nadchodzące premiery                │
│  [carousel premier]                     │
├─────────────────────────────────────────┤
│  💡 Co zagrać po Elden Ring?            │  ← NOWE
│  Oparte na Twoich ukończonych grach     │
│  [Sekiro] [Dark Souls 3] [Nioh 2]...    │
├─────────────────────────────────────────┤
│  👥 Aktywność znajomych                 │
│  [feed]                                 │
└─────────────────────────────────────────┘
```

---

### 7.4 "Odkryj gatunek" — ekspansja

Jeśli user gra głównie RPG — pokaż mu raz na miesiąc:
*"Próbowałeś już gier strategicznych? Twoi znajomi wysoko oceniali Civilization VI"*

To zachęca do rozszerzenia biblioteki i zwiększa czas w aplikacji.

---

### 7.5 Integracja z IGDB — jakość rekomendacji

IGDB API (już podłączone) ma pole `similar_games` — lista gier podobnych wg redakcji IGDB.
To gotowy, kuratorowany algorytm "podobnych gier" — wystarczy go użyć.

**Implementacja:**
- Przy `updateGameData` → pobierz `similar_games` z IGDB → zapisz do nowej tabeli `SimilarGame`
- Rekomendacje = `SimilarGame` dla ostatnio ukończonych gier użytkownika

---

### Szacunek nakładu (5. Rekomendacje)

| Zadanie | Złożoność |
|---|---|
| Algorytm oparty na gatunkach | Mała (2-3 dni) |
| "Znajomi też grali" query | Średnia (3-4 dni) |
| IGDB similar_games integracja | Mała (2-3 dni) |
| Placement na Home screen | Mała (1 dzień) |
| "Odkryj gatunek" sekcja | Średnia (2-3 dni) |

---

## 6. Premiery i Obserwowane — kalendarz wydań po platformie

### Motywacja

Feedback od użytkowników: chcą wiedzieć **co premieruje na ich platformie** — i mieć to w jednym miejscu razem z trackingiem gier.
Zamiast ogólnej wishlisty — konkretny, aktualny kalendarz premier z możliwością "obserwowania" wybranej gry i automatycznym powiadomieniem 3 dni przed premierą.

---

### 6.1 Ekran "Premiery" — nowa zakładka

**Dostęp:** nowa zakładka w dolnej nawigacji lub sekcja "Nadchodzące" na HomeScreen (carousel + "Zobacz wszystkie").

**Widok:**

```
┌──────────────────────────────────────┐
│  🗓 Nadchodzące premiery             │
│  Filtruj: [PS5] [Xbox] [Switch 2]   │
│           [Switch] [PC]             │
│  ────────────────────────────────   │
│  SIERPIEŃ 2026                       │
│  [okładka]  Astro Bot 2             │
│              PS5 · 12 Sie           │
│              [🔔 Obserwuj]          │
│  ─────────────────────────────────  │
│  [okładka]  Metroid Prime 4         │
│              Switch 2 · 18 Sie      │
│              [✓ Obserwujesz]        │
│  ─────────────────────────────────  │
│  WRZESIEŃ 2026                       │
│  ...                                 │
└──────────────────────────────────────┘
```

- Filtr platformy zapamiętany z historii użytkownika (lub wybierany ręcznie)
- Sekcje po miesiącach
- **"Obserwuj"** = jeden tap → push notification 3 dni przed premierą

**Źródło danych:** IGDB API (już podłączone) — query po `first_release_date > now()` filtrowane po `platform`

---

### 6.2 Mechanizm "Obserwuj premierę"

Gdy user tapnie "Obserwuj":
- Zapisywane w nowej tabeli `WatchedRelease`
- Widoczne w profilu — sekcja "Obserwuję premiery"
- Push notification 3 dni przed (cron + integracja z inicjatywą #2)

```
Obserwujesz 4 gry:
• Metroid Prime 4       Switch 2 · 18 Sierpień
• GTA 6                 PS5     · 26 Września
• Monster Hunter Wilds 2 PS5/Xbox · TBA
• Silksong              Switch  · TBA
```

**Nowa tabela Prisma:**
```prisma
model WatchedRelease {
  id        Int      @id @default(autoincrement())
  oauthId   String   @map("oauth_id")
  hltbId    Int      @map("hltb_id")
  createdAt DateTime @default(now())
  user      User     @relation(fields: [oauthId], references: [oauthId])
  game      Game     @relation(fields: [hltbId], references: [hltbId])
  @@unique([oauthId, hltbId])
  @@map("watched_releases")
}
```

**Nowe operacje GraphQL:**
```graphql
mutation watchRelease(hltbId: Int!): Boolean
mutation unwatchRelease(hltbId: Int!): Boolean
query myWatchedReleases: [GameWithAllDataDTO]
query upcomingReleases(platformIds: [Int], take: Int, skip: Int): [GameWithAllDataDTO]
```

---

### 6.3 Powiadomienie o premierze

Nowy `@Cron` w `tasks.service.ts` — codziennie sprawdza gry które premierują za dokładnie 3 dni i mają obserwujących:

```
🎮 Metroid Prime 4 premiera za 3 dni!
   Switch 2 · 18 Sierpień
   [Otwórz grę →]
```

---

### 6.4 Sekcja na HomeScreen

```
┌────────────────────────────────────────┐
│  🗓 Nadchodzące premiery               │
│  [Astro Bot 2]  [Metroid PM4]  [+4]   │
│  PS5 · 12 Sie   Switch 2 · 18 Sie     │
└────────────────────────────────────────┘
```

Carousel na HomeScreen z grami z filtra platform usera. Klik → ekran pełnego kalendarza.

---

### Szacunek nakładu (6. Premiery)

| Zadanie | Złożoność |
|---|---|
| IGDB query dla upcoming releases | Mała (1-2 dni) |
| Ekran kalendarza z filtrem platform | Średnia (2-3 dni) |
| "Obserwuj" model + mutacje API | Mała (1-2 dni) |
| Push notification (bazuje na #2) | Minimalna (0.5 dnia) |
| Sekcja "Obserwuję" w Profilu | Minimalna (0.5 dnia) |
| Carousel na HomeScreen | Minimalna (0.5 dnia) |

---

## 7. Oceny zewnętrzne — Metacritic i OpenCritic

### Motywacja

Feedback użytkowników: chcą widzieć **oceny graczy i krytyków z popularnych serwisów** (Metacritic, OpenCritic) bez wychodzenia z appki. Jedna statystyka — "co mówią krytycy o tej grze?" — obok własnej oceny użytkownika i oceny znajomych.

---

### 7.1 Wyświetlanie ocen na GameScreen

Nowa sekcja "Oceny" między danymi HLTB a sekcją znajomych:

```
┌──────────────────────────────────────┐
│  📊 Oceny                            │
│  ────────────────────────────────    │
│  🎮 Gracze (Game Critique): 8.2/10  │
│     Twoja ocena: 9/10               │
│                                      │
│  🎬 Krytycy:                         │
│     [MC] Metacritic    92/100        │
│     [OC] OpenCritic    94/100        │
│                                      │
│  ⏱ HLTB Main Story:   ~55h          │
└──────────────────────────────────────┘
```

---

### 7.2 Źródła danych

**Metacritic:**
- IGDB API (już podłączone) ma pole `external_games` z kategorią `8 = Metacritic` — zawiera `uid` (Metacritic URL slug) i rating
- Alternatywnie: IGDB pole `aggregated_rating` (agreguje oceny zewnętrznych krytyków, w tym Metacritic)
- Przechowujemy jako pole `metacriticScore` w tabeli `Game`

**OpenCritic:**
- OpenCritic udostępnia publiczne API (`opencritic.com/api`) — można wyszukać grę po tytule i pobrać `topCriticScore`
- Lub: IGDB `aggregated_rating` jako przybliżenie (nie jest tożsame z OC, ale podobne)
- Przechowujemy jako pole `openCriticScore` w tabeli `Game`

**Strategia odświeżania:**
- Pobieranie przy `updateGameData` (command który już istnieje)
- Nullable — nie każda gra ma oceny na obu serwisach
- Cache w bazie, nie fetch na żywo przy każdym wyświetleniu

---

### 7.3 Zmiany w kodzie

**Prisma — rozszerzenie modelu `Game`:**
```prisma
model Game {
  // ... istniejące pola
  metacriticScore  Int?    @map("metacritic_score")
  openCriticScore  Int?    @map("open_critic_score")
  externalRating   Float?  @map("external_rating")   // IGDB aggregated_rating
}
```

**API — rozszerzenie `UpdateGameDataHandler`:**
```typescript
// W update_game_data.handler.ts — przy fetchowaniu z IGDB
// dodać pobieranie: fields aggregated_rating, external_games.uid, external_games.category
// zapisać do nowych pól w Game
```

**Native — GameScreen:**
- Nowy komponent `GameExternalScores` wyświetlający badge'e z ocenami
- Kolorowanie: >= 80 → zielony, 60–79 → żółty, < 60 → czerwony

---

### Szacunek nakładu (7. Oceny zewnętrzne)

| Zadanie | Złożoność |
|---|---|
| Migracja Prisma (nowe pola) | Minimalna (0.5 dnia) |
| Pobieranie z IGDB w UpdateGameData | Mała (1 dzień) |
| OpenCritic API integration | Mała (1 dzień) |
| Komponent UI na GameScreen | Mała (1 dzień) |

---

## 8. Wersja webowa dla użytkowników

### Motywacja

Aplikacja native dociera tylko do użytkowników którzy ją pobiorą. Wersja webowa:
- Pozwala korzystać z appki **bez instalacji** (przeglądarka, link)
- Umożliwia **udostępnianie profilu i statystyk** (linkowanie do gier, wrapped)
- Otwiera drzwi dla użytkowników na **desktopie** (PS/Xbox gracze często siedzą przy PC)
- Ułatwia **onboarding** — zanim ktoś pobierze appkę, może ją wypróbować w przeglądarce

---

### 8.1 Strategia: Expo Web jako pierwszy krok

Projekt używa **Expo Router** który od wersji 3+ obsługuje web natywnie. Gluestack (aktualnie rewrite) **w pełni wspiera web** przez NativeWind. To znaczy że ten sam codebase można uruchomić w przeglądarce przy minimalnym nakładzie.

**Fazy:**

#### Faza 1 — Expo Web MVP (10-14 dni)
Uruchomić istniejący codebase native jako Progressive Web App:

```
apps/native/
  app.config.ts         ← dodać web: { bundler: "metro" }
  app/
    (app)/              ← te same ekrany działają na web
  metro.config.ts       ← upewnić się że web bundle działa
```

- `expo export --platform web` → statyczny build do hostowania
- Deployable na Vercel/Netlify (statyczny HTML + JS)
- Auth0 już obsługuje web flow (PKCE)
- GraphQL endpoint ten sam co native
- PWA: dodać `manifest.json`, ikony, `service-worker` (Expo to generuje)

**Co działa od razu po uruchomieniu:**
- Logowanie przez Auth0
- Lista gier (GameStatusList)
- GameScreen ze szczegółami
- Statystyki
- Profil

**Co wymaga dostosowania na web:**
- Nawigacja — Expo Router automatycznie mapuje `/` → `(tabs)`, ale może wymagać tweaków
- Natywne gesty (swipe) → zastąpić klikowalnymi alternatywami
- `expo-notifications` — nie działa na web (zakomentować lub feature-flag)
- `expo-secure-store` → web fallback na `localStorage`

---

#### Faza 2 — Osobna `apps/web-user` (opcjonalna, 20-30 dni)

Jeśli doświadczenie webowe wymaga pełnego redesignu pod desktop/mouse:

```
monorepo/
  apps/
    api/          ← bez zmian
    web/          ← istniejący panel admin
    web-user/     ← NOWY: React + Vite + TanStack Router (jak admin, ale user-facing)
    native/       ← bez zmian
  packages/
    graphql-types/ ← współdzielone typy (już istnieje przez codegen)
```

**Co współdzielić między native i web-user:**
- GraphQL queries/mutations (`.graphql` files) — codegen generuje typy dla obu
- Logikę biznesową (hooki bez warstwy UI)
- `packages/graphql-types/` — nowy shared package z typami

**Kiedy wybrać Fazę 2 zamiast Expo Web:**
- Jeśli UX webowy mocno się różni od mobile (sidebar, hover states, keyboard shortcuts)
- Jeśli wydajność Expo Web okaże się niewystarczająca (bundle size ~3-5x większy niż Vite)
- Jeśli chcesz SEO (Expo Web nie ma SSR out-of-the-box; Next.js / TanStack Start rozwiązują problem)

---

### 8.2 Publiczne profile i udostępnianie

Kluczowa feature wersji web — możliwość linkowania do profilu:

```
https://gamecritique.app/u/jan_kowalski
→ Publiczny profil Jana:
  - Ostatnie ukończone gry
  - Statystyki (jeśli udostępnione)
  - Wrapped screenshot embed
```

- Nowe pole `isPublic: boolean` na `Profile` — domyślnie `false`
- Unguarded GraphQL query: `publicProfile(username)` — tylko jeśli `isPublic = true`
- Generowanie OG image (Open Graph) dla social media preview

---

### 8.3 Routing i co-existence z panelem admin

Obecny `apps/web` to **panel admina** (chroniony, tylko `ADMIN` rola). Wersja webowa dla userów to osobna app lub osobne route'y.

**Opcja A — osobna domena:**
```
admin.gamecritique.app  → apps/web (panel admin, już istnieje)
gamecritique.app        → apps/web-user lub Expo Web build
```

**Opcja B — jeden `apps/web` z warunkami:**
```
/admin/*   → admin panel (JwtAuthGuard + AdminUserGuard)
/app/*     → user-facing routes (JwtAuthGuard, rola USER)
/u/:username → publiczny profil (bez auth)
```
Łatwiejsze do wdrożenia ale trudniejsze do utrzymania long-term.

---

### 8.4 Zmiany w API wymagane przez Fazę 2

| Zmiana | Powód |
|---|---|
| `publicProfile(username)` query | Publiczne profile bez auth |
| `Profile.isPublic` pole | Toggle widoczności |
| CORS update w NestJS | Nowa domena web-user musi być dozwolona |
| Auth0 — nowy Application (SPA) | Oddzielna konfiguracja dla web-user flow |

---

### Szacunek nakładu (8. Wersja webowa)

| Zadanie | Złożoność |
|---|---|
| Faza 1: Expo Web build + deploy | Średnia (5-7 dni) |
| Faza 1: Auth + web-specific fixes | Mała (2-3 dni) |
| Faza 1: PWA manifest + icons | Minimalna (0.5 dnia) |
| Faza 1: Web-only navigation tweaks | Mała (2-3 dni) |
| Faza 2: apps/web-user scaffold | Średnia (5-7 dni) |
| Faza 2: Migracja ekranów do React/Vite | Duża (15-20 dni) |
| Publiczne profile (API + UI) | Mała (2-3 dni) |

> **Rekomendacja:** zacznij od Fazy 1 (Expo Web). Zajmuje ~10 dni i daje działający produkt. Faza 2 dopiero jeśli Expo Web okaże się niewystarczające lub pojawi się potrzeba SEO.

---

## 9. Linki do guide'ów z trofeami i osiągnięciami

### Motywacja

Gracze konsolowi (PS/Xbox/Switch — dominująca platforma w Game Critique) regularnie korzystają z zewnętrznych serwisów po poradniki do trofeów i osiągnięć. Dziś muszą wychodzić z appki żeby je znaleźć.

Prosta zmiana: **sekcja "Poradniki i trofea" na GameScreen** z bezpośrednimi linkami do odpowiednich serwisów — dopasowanymi do platformy na której user gra.

---

### 9.1 Sekcja na GameScreen

```
┌──────────────────────────────────────┐
│  🏆 Trofea i poradniki               │
│  ────────────────────────────────    │
│  🔵 PSNProfiles   → przewodnik po   │
│     trofeach (PS4/PS5)              │
│  🟢 TrueAchievements → lista        │
│     osiągnięć (Xbox)               │
│  🔴 YouTube       → video guide     │
│  📖 Fextralife    → wiki + walkthru │
└──────────────────────────────────────┘
```

Linki generowane dynamicznie na podstawie **tytułu gry + platformy usera**:
- Wyświetlane tylko jeśli gra jest w statusie `IN_PROGRESS` lub `COMPLETED`
- Platforma-specific: PS user widzi PSNProfiles + YouTube, Xbox user widzi TrueAchievements + YouTube

---

### 9.2 Serwisy i generowanie linków

| Serwis | Platforma | URL pattern |
|---|---|---|
| PSNProfiles | PS4, PS5 | `psnprofiles.com/trophies/search?q={title}` |
| TrueAchievements | Xbox One, Xbox Series X | `trueachievements.com/searchresults.aspx?search={title}` |
| Exophase | PS, Xbox, Steam, Switch | `exophase.com/search/?q={title}&type=games` |
| YouTube | Wszystkie | `youtube.com/results?search_query={title}+trophy+guide` |
| Fextralife | Wszystkie | `fextralife.com/?s={title}` |

Wszystkie linki otwierane przez `Linking.openURL()` (Expo Linking — już w projekcie).

**Zaawansowanie (opcjonalne):** IGDB `external_games` zawiera `uid` dla PlayStation Network — można generować bezpośredni link do PSNProfiles (`psnprofiles.com/trophies/{psn_uid}`) zamiast wyszukiwania. Wymaga dodania `psnId` do modelu `Game`.

---

### 9.3 Implementacja

**Czysto frontendowa** — brak zmian w API (linki generowane w UI na podstawie tytułu):

```typescript
// Nowy komponent: modules/screens/game/game_trophy_links/game_trophy_links.tsx
const TROPHY_LINKS = {
  PS4: [
    { label: 'PSNProfiles', icon: '🔵', url: (title) => `https://psnprofiles.com/trophies/search?q=${encodeURIComponent(title)}` },
    { label: 'Exophase', icon: '🎯', url: (title) => `...` },
  ],
  PS5: [...], // to samo co PS4
  XBOX_ONE: [
    { label: 'TrueAchievements', icon: '🟢', url: (title) => `...` },
  ],
  XBOX_SERIES_X: [...],
  // ALL platforms:
  COMMON: [
    { label: 'YouTube Guide', icon: '🔴', url: (title) => `...` },
    { label: 'Fextralife', icon: '📖', url: (title) => `...` },
  ],
};
```

- `game_screen.tsx` → dodać `<GameTrophyLinks gameTitle={game.title} userPlatform={userStatus.platform} />`
- Linki otwierane przez `Expo.Linking.openURL()`
- Widoczne tylko gdy `userStatus` istnieje (gra jest na liście usera)

---

### Szacunek nakładu (9. Linki do guide'ów)

| Zadanie | Złożoność |
|---|---|
| Komponent GameTrophyLinks | Mała (1 dzień) |
| Mapa URL patterns per platforma | Minimalna (0.5 dnia) |
| Integracja z GameScreen | Minimalna (0.5 dnia) |
| (Opcjonalnie) PSN ID z IGDB | Mała (1-2 dni) |

---

## Podsumowanie roadmapy

### Priorytety wg impact/nakład

```
HIGH IMPACT / LOW EFFORT  →  Zacznij tutaj
├── 4.5 Timestampy w aktywności          (0.5 dnia)
├── 5.6 Klikalna gra w feedzie           (0.5 dnia)
├── 4.5 Fix skróconych nazw (stats)      (0.5 dnia)
├── 9.1 Linki do guide'ów z trofeami     (2 dni, czysto frontend)
├── 7.1 Oceny Metacritic/OpenCritic      (2-3 dni, bazuje na IGDB)
├── 3.3 Streak tygodniowy                (1-2 dni)
└── 1.4 Smart defaults platformy         (0.5 dnia)

HIGH IMPACT / MEDIUM EFFORT  →  Sprint 1-2
├── 1.1 Swipe-to-change-status           (3-4 dni)
├── 1.2 Quick Complete formularz         (1-2 dni)
├── 1.3 One-tap z GameScreen             (1-2 dni)
├── 2.1 Push notifications (podstawowe)  (5-7 dni)
└── 6.1 Ekran premier + Obserwuj         (4-6 dni)

MEDIUM IMPACT / MEDIUM EFFORT  →  Sprint 3-4
├── 3.1 Rozszerzone statystyki           (5-7 dni)
├── 4.1 Emoji reakcje                    (3-4 dni)
├── 4.2 Znajomi + społeczność GameScreen (1-2 dni)
├── 4.3 Head to Head comparison          (3-4 dni)
└── 5.1 Rekomendacje (gatunek)           (2-3 dni)

HIGH IMPACT / HIGH EFFORT  →  Sprint 5+
├── 3.2 Gaming Wrapped                   (5-7 dni)
├── 8.1 Wersja webowa Faza 1 (Expo Web) (10-14 dni)
├── 5.2 "Znajomi też grali" rekomendacje (3-4 dni)
└── 5.5 IGDB similar_games               (2-3 dni)

STRATEGIC / VERY HIGH EFFORT  →  Długoterminowo
└── 8.2 Wersja webowa Faza 2 (web-user) (20-30 dni)
```

### Całkowity szacunkowy nakład

| Inicjatywa | Min | Max |
|---|---|---|
| 1. Quick Add | 6 dni | 9 dni |
| 2. Push Notifications | 7 dni | 10 dni |
| 3. Statystyki + Wrapped | 11 dni | 17 dni |
| 4. Social Light | 9 dni | 13 dni |
| 5. Rekomendacje | 10 dni | 14 dni |
| 6. Premiery i Obserwowane | 6 dni | 8 dni |
| 7. Oceny Metacritic / OpenCritic | 3 dni | 4 dni |
| 8. Wersja webowa (Faza 1) | 10 dni | 14 dni |
| 9. Linki do guide'ów (trofea) | 2 dni | 3 dni |
| **RAZEM (Fazy 1)** | **64 dni** | **92 dni** |

> Faza 2 wersji webowej (osobna `apps/web-user`) to dodatkowe 20-30 dni poza powyższym.
> Szacunki zakładają jednego developera fullstack.
> Przy pracy równoległej na API i native — można zredukować o ~30%.

---

## Sugerowane podejście do pierwszych 2 sprintów

### Sprint 1 (2 tygodnie) — "Redukcja tarcia"

Cel: żeby korzystanie z aplikacji było szybsze i wygodniejsze.

- [ ] Quick Complete formularz (tryb szybki/szczegółowy)
- [ ] One-tap "Gram teraz" z GameScreen
- [ ] Swipe-to-change-status na liście gier
- [ ] Timestampy w aktywności znajomych
- [ ] Klikalna gra w feedzie → GameScreen
- [ ] Smart defaults ostatnio używanej platformy (+ obsługa Switch 2 / PS5 Pro)
- [ ] Fix skróconych nazw w statystykach

### Sprint 2 (2 tygodnie) — "Powód do wracania"

Cel: żeby użytkownicy mieli powód do wejścia co tydzień.

- [ ] Rejestracja Expo Push Tokens (backend + app)
- [ ] Push: znajomy ukończył grę którą masz
- [ ] Push: znajomy ocenił grę / napisał recenzję
- [ ] Push: tygodniowe podsumowanie (cron poniedziałek)
- [ ] Streak tygodniowy na HomeScreen
- [ ] Ekran premier z filtrem platform + "Obserwuj premierę"

---

*Dokument ostatnio zaktualizowany: lipiec 2026*
