# Native

A [react-native](https://reactnative.dev/) app built using [expo](https://docs.expo.dev/)

## 🏗️ Build System

This project uses **Expo Prebuild** workflow:
- Native folders (`android/`, `ios/`) are **generated automatically** from `app.json`
- They are **not tracked in git** (in `.gitignore`)
- EAS Build regenerates them on every build

### Quick Commands

```bash
# Development
yarn dev-local              # Start dev server with local API
yarn dev                    # Run on Android device with production API

# Prebuild (regenerate native folders)
yarn prebuild               # Generate android/ios from app.json

# Building
yarn build-android          # Build production APK (EAS Build local)
yarn build-android-dev      # Build development APK
yarn build-ios              # Build iOS (EAS Build local)

# GraphQL
yarn generate-graph         # Generate GraphQL types (local env)
yarn generate-graph-prod    # Generate GraphQL types (production env)
```

### First Time Setup

If you don't have `android/` or `ios/` folders locally:

```bash
yarn prebuild
```

This will generate them from `app.json` configuration.

## 📱 Tech Stack

- **Expo SDK 54** with React Native 0.81
- **Expo Router 6** for navigation
- **Tamagui** for UI components
- **Apollo Client** for GraphQL
- **React Hook Form + Zod** for forms
- **Auth0** for authentication

## 🔗 Links

- [Expo Prebuild Docs](https://docs.expo.dev/workflow/prebuild/)
- [EAS Build Configuration](https://docs.expo.dev/build/eas-json/)

