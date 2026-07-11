# Game Critique — Dokumentacja

> Kompleksowa dokumentacja wszystkich funkcji aplikacji Game Critique.

## Spis treści

| Dokument | Opis |
|---|---|
| [Architektura](./architecture.md) | Stack technologiczny, struktura monorepo, wzorce architektoniczne |
| [API — Funkcje](./api-features.md) | Wszystkie moduły backendu, GraphQL queries/mutations, REST endpointy |
| [Web Admin Panel](./web-admin.md) | Wszystkie widoki i funkcje panelu administracyjnego |
| [Roadmapa — Native App](./native-roadmap.md) | 7 inicjatyw rozwojowych aplikacji mobilnej z pełnym opisem UX, architekturą i szacunkami |

## Skrócony przegląd systemu

### Co robi aplikacja?

**Game Critique** to platforma do śledzenia i oceniania gier wideo. Użytkownicy mogą:
- Śledzić status swoich gier (w trakcie, ukończone, porzucone, backlog)
- Oceniać i recenzować gry
- Zarządzać kolekcjami gier
- Obserwować aktywność znajomych
- Importować dane z HowLongToBeat

### Aplikacje w monorepo

| Aplikacja | Ścieżka | Opis |
|---|---|---|
| **API** | `apps/api` | Backend NestJS + GraphQL + PostgreSQL |
| **Web** | `apps/web` | Panel admina (React + Vite + TanStack) |
| **Native** | `apps/native` | Aplikacja mobilna (Expo + React Native) |

### Moduły backendu

| Moduł | Odpowiedzialność |
|---|---|
| `auth` | Autentykacja JWT / Auth0, tworzenie użytkowników |
| `users` | Pobieranie danych użytkowników (admin) |
| `profiles` | Zarządzanie profilami użytkowników |
| `roles` | Role (ADMIN / USER), zarządzanie uprawnieniami |
| `games` | Baza gier, paginacja, aktualizacja danych, nadchodzące premiery |
| `games_status` | Statusy gier użytkownika (tracking, recenzje, oceny) |
| `collections` | Kolekcje gier użytkownika |
| `search` | Wyszukiwanie gier przez HowLongToBeat API |
| `friends` | Lista znajomych, zaproszenia, aktywność, wyszukiwanie |
| `user_stats` | Statystyki użytkownika |
| `platforms` | Platformy sprzętowe, zarządzanie nazwami |
| `images` | Upload zdjęć (Cloudinary) |
| `howlongtobeat_migration` | Import danych z CSV eksportu HLTB |
| `howlongtobeat_parser` | Web scraping danych z HLTB (Puppeteer) |
