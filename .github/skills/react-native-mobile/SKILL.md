---
name: react-native-mobile
description: Expo React Native mobile app using Tamagui UI, Apollo Client, and Expo Router. Use this skill when working with the native mobile app in apps/native, creating screens, components, or mobile-specific features.
license: MIT
---

# React Native Mobile App Skill

## Overview
This skill covers the Expo React Native mobile application that provides game tracking and social features for iOS and Android platforms.

## Technology Stack
- **Framework**: Expo SDK 49.x with React Native 0.72.10
- **Navigation**: Expo Router 2.x (file-based routing)
- **UI Library**: Tamagui 1.79.6 (cross-platform components)
- **GraphQL**: Apollo Client 3.8.8 with code generation
- **Authentication**: React Native Auth0 3.1.0
- **Forms**: React Hook Form 7.49.3 with Zod 3.22.4
- **State Management**: Zustand 4.5.2 + Apollo Client cache
- **Animations**: Moti (react-native-reanimated)
- **Build**: EAS Build for deployments

## Project Structure

```
apps/native/
├── app/                           # Expo Router app directory
│   ├── _layout.tsx               # Root layout with providers
│   ├── index.tsx                 # Home/landing screen
│   └── (app)/                    # Authenticated routes
│       ├── (tabs)/               # Tab navigation
│       ├── auth/                 # Auth screens
│       └── search/               # Search screens
├── modules/                       # Feature modules
│   ├── dates/                    # Date utilities
│   ├── files/                    # File handling
│   ├── forms/                    # Form components
│   ├── games_status/             # Game tracking features
│   ├── graphql/                  # Apollo Client setup
│   ├── layouts/                  # Layout components
│   ├── photos/                   # Photo upload/display
│   ├── router/                   # Navigation utilities
│   ├── screens/                  # Screen components
│   ├── strings/                  # String utilities
│   └── user/                     # User-related features
├── ui/                           # Reusable UI components
│   ├── data-display/            # Charts, lists, cards
│   ├── feedback/                # Toasts, loaders, skeletons
│   ├── forms/                   # Input components
│   ├── hooks/                   # Custom hooks
│   ├── overlay/                 # Modals, dialogs
│   ├── panels/                  # Cards, sheets
│   └── typography/              # Text components
├── assets/                       # Images, fonts, icons
├── __generated__/               # GraphQL generated types
└── mocks/                       # Mock data for development
```

## Expo Router Navigation

### File-Based Routing
Routes are automatically generated from the file structure:

```typescript
// app/_layout.tsx - Root layout
export default function RootLayout() {
  return (
    <Auth0Provider clientId={CLIENT_ID} domain={DOMAIN}>
      <SafeAreaProvider>
        <TamaguiProvider config={tamaguiConfig}>
          <ApolloProvider>
            <ToastProvider>
              <Stack>
                <Stack.Screen name="(app)/(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(app)/search" options={{ headerShown: false }} />
                <Stack.Screen name="(app)/auth" options={{ headerShown: true, header: Header }} />
              </Stack>
            </ToastProvider>
          </ApolloProvider>
        </TamaguiProvider>
      </SafeAreaProvider>
    </Auth0Provider>
  );
}
```

### Navigation Patterns
```typescript
// Using Expo Router hooks
import { useRouter, useLocalSearchParams } from 'expo-router';

export function GameScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const navigateToDetails = () => {
    router.push(`/game/${id}`);
  };

  return (
    // Component
  );
}
```

## Tamagui UI Framework

### Theme Configuration
```typescript
// tamagui.config.ts
import { config } from "@tamagui/config/v2";
import { createTamagui, createTokens } from "tamagui";

const tokens = createTokens({
  ...config.tokens,
  color: {
    background: "#050505",
    container: "hsl(212, 35.0%, 9.2%)",
  },
});

const tamaguiConfig = createTamagui({
  ...config,
  tokens,
});

export default tamaguiConfig;
```

### Component Patterns
```typescript
import { YStack, XStack, Text, Button, Card } from 'tamagui';

export function GameCard({ game }) {
  return (
    <Card elevate size="$4" bordered>
      <Card.Header padded>
        <Text fontSize="$6" fontWeight="bold">
          {game.title}
        </Text>
      </Card.Header>
      
      <Card.Footer padded>
        <XStack gap="$2">
          <Button flex={1} onPress={() => {}}>
            Play
          </Button>
          <Button flex={1} theme="alt" onPress={() => {}}>
            Details
          </Button>
        </XStack>
      </Card.Footer>
    </Card>
  );
}
```

### Common Tamagui Components
- **Layout**: `YStack` (vertical), `XStack` (horizontal), `ZStack` (overlay)
- **Text**: `Text`, `Heading`, `Paragraph`
- **Input**: `Input`, `TextArea`, `Select`
- **Interactive**: `Button`, `Switch`, `Checkbox`, `Slider`
- **Containers**: `Card`, `Sheet`, `Dialog`
- **Icons**: `@tamagui/lucide-icons`

## GraphQL with Apollo Client

### Setup
```typescript
// modules/graphql/apollo_provider.tsx
import { ApolloClient, InMemoryCache, ApolloProvider as AP } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.EXPO_PUBLIC_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${token}`,
  },
});

export function ApolloProvider({ children }) {
  return <AP client={client}>{children}</AP>;
}
```

### Creating GraphQL Operations
```graphql
# modules/games_status/use_upsert_game_status/use_upsert_game_status_mutation.graphql
mutation UpsertGameStatus($input: UpsertGameStatusArgsDTO!) {
  upsertGameStatus(upsertGameStatusArgs: $input) {
    message
  }
}
```

### Using Generated Hooks
```typescript
// Auto-generated from codegen
import { useUpsertGameStatusMutation } from './use_upsert_game_status_mutation.generated';

export function GameStatusForm() {
  const [upsertStatus, { loading, error }] = useUpsertGameStatusMutation({
    onCompleted: (data) => {
      toast.show(data.upsertGameStatus.message);
    },
  });

  const handleSubmit = (values) => {
    upsertStatus({
      variables: {
        input: {
          gameId: values.gameId,
          status: values.status,
          rating: values.rating,
        },
      },
    });
  };

  return (
    // Form component
  );
}
```

### Code Generation
```bash
# Generate GraphQL types
yarn generate-graph        # For local development
yarn generate-graph-prod   # For production build (EAS)
```

## Forms with React Hook Form

### Form Pattern
```typescript
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  rating: z.number().min(1).max(10),
  status: z.enum(['PLAYING', 'COMPLETED', 'DROPPED']),
});

type FormData = z.infer<typeof schema>;

export function GameForm() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      rating: 5,
      status: 'PLAYING',
    },
  });

  const onSubmit = (data: FormData) => {
    // Handle submission
  };

  return (
    <YStack gap="$4">
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <Input
            value={value}
            onChangeText={onChange}
            placeholder="Game title"
          />
        )}
      />
      {errors.title && (
        <Text color="$red10">{errors.title.message}</Text>
      )}
      
      <Button onPress={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </YStack>
  );
}
```

## Authentication with Auth0

### Setup in Layout
```typescript
import { useAuth0 } from 'react-native-auth0';

export function AuthScreen() {
  const { authorize, clearSession, user, isLoading } = useAuth0();

  const login = async () => {
    try {
      await authorize();
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = async () => {
    try {
      await clearSession();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <YStack gap="$4" padding="$4">
      {!user ? (
        <Button onPress={login}>Login</Button>
      ) : (
        <>
          <Text>Welcome, {user.name}</Text>
          <Button onPress={logout}>Logout</Button>
        </>
      )}
    </YStack>
  );
}
```

### Secure Token Storage
```typescript
import * as SecureStore from 'expo-secure-store';

// Store token
await SecureStore.setItemAsync('authToken', token);

// Retrieve token
const token = await SecureStore.getItemAsync('authToken');

// Delete token
await SecureStore.deleteItemAsync('authToken');
```

## Native Features

### Image Picker
```typescript
import * as ImagePicker from 'expo-image-picker';

export function PhotoUpload() {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      // Upload image
    }
  };

  return (
    <Button onPress={pickImage}>Select Photo</Button>
  );
}
```

### Document Picker
```typescript
import * as DocumentPicker from 'expo-document-picker';

export function FilePicker() {
  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: true,
    });

    if (result.type === 'success') {
      // Handle file
    }
  };

  return (
    <Button onPress={pickDocument}>Pick File</Button>
  );
}
```

### Toast Notifications
```typescript
import { useToastController } from '@tamagui/toast';
import { toast } from 'burnt'; // Native toasts

export function NotificationExample() {
  const toastController = useToastController();

  const showTamagui = () => {
    toastController.show('Success!', {
      duration: 3000,
    });
  };

  const showNative = () => {
    toast({
      title: 'Success!',
      preset: 'done',
    });
  };

  return (
    <YStack gap="$2">
      <Button onPress={showTamagui}>Tamagui Toast</Button>
      <Button onPress={showNative}>Native Toast</Button>
    </YStack>
  );
}
```

## UI Component Library

### Creating Reusable Components
```typescript
// ui/data-display/game-card/game-card.tsx
import { Card, YStack, XStack, Text, Image } from 'tamagui';

interface GameCardProps {
  title: string;
  coverUrl: string;
  rating?: number;
  onPress?: () => void;
}

export function GameCard({ title, coverUrl, rating, onPress }: GameCardProps) {
  return (
    <Card onPress={onPress} pressStyle={{ scale: 0.98 }}>
      <Card.Header>
        <Image source={{ uri: coverUrl }} width="100%" height={200} />
      </Card.Header>
      
      <Card.Footer padded>
        <YStack gap="$2">
          <Text fontSize="$5" fontWeight="bold">
            {title}
          </Text>
          {rating && (
            <XStack gap="$1" alignItems="center">
              <Text>⭐</Text>
              <Text>{rating}/10</Text>
            </XStack>
          )}
        </YStack>
      </Card.Footer>
    </Card>
  );
}
```

### Loading States
```typescript
import ContentLoader, { Rect } from 'react-content-loader/native';

export function GameCardSkeleton() {
  return (
    <ContentLoader
      speed={2}
      width={300}
      height={400}
      backgroundColor="#1a1a1a"
      foregroundColor="#2a2a2a"
    >
      <Rect x="0" y="0" rx="8" ry="8" width="300" height="200" />
      <Rect x="16" y="220" rx="4" ry="4" width="200" height="20" />
      <Rect x="16" y="250" rx="4" ry="4" width="100" height="16" />
    </ContentLoader>
  );
}
```

## Animations with Moti

```typescript
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';

export function AnimatedCard() {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        type: 'timing',
        duration: 500,
        easing: Easing.out(Easing.exp),
      }}
    >
      <Card>
        {/* Content */}
      </Card>
    </MotiView>
  );
}
```

## State Management with Zustand

```typescript
// modules/user/user-store.ts
import { create } from 'zustand';

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

// Usage in components
export function ProfileScreen() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  return (
    <YStack>
      <Text>{user?.name}</Text>
    </YStack>
  );
}
```

## Development Commands

```bash
# Development
yarn dev                   # Android with production API
yarn dev-local            # Android with local API (port 3001)
yarn android              # Run Android
yarn ios                  # Run iOS

# Code Generation
yarn generate-graph       # Generate GraphQL types (local)
yarn generate-graph-prod  # Generate GraphQL types (production)

# Building
yarn build-android        # EAS build for Android
yarn build-ios           # EAS build for iOS
yarn build-android-dev   # Development build for Android

# Code Quality
yarn lint                 # ESLint
```

## EAS Build Configuration

```json
// eas.json
{
  "build": {
    "production": {
      "android": {
        "buildType": "apk"
      },
      "ios": {
        "buildConfiguration": "Release"
      }
    },
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    }
  }
}
```

## Best Practices

1. **Use Tamagui components** for cross-platform consistency
2. **Co-locate GraphQL operations** with components
3. **Use TypeScript strictly** - no `any` types
4. **Implement error boundaries** for graceful error handling
5. **Use debouncing** for search inputs (`use-debounce`)
6. **Handle loading states** - show skeletons, not blank screens
7. **Use SecureStore** for sensitive data
8. **Optimize images** - use appropriate resolutions
9. **Test on both platforms** - iOS and Android can differ
10. **Use EAS Build** for consistent builds

## Common Patterns

### Screen Template
```typescript
import { YStack, ScrollView, Text, Spinner } from 'tamagui';
import { useLocalSearchParams } from 'expo-router';
import { useGameQuery } from './use_game_query.generated';

export function GameDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, loading, error } = useGameQuery({
    variables: { hltbId: parseInt(id) },
  });

  if (loading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Spinner size="large" />
      </YStack>
    );
  }

  if (error) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" padding="$4">
        <Text color="$red10">Error: {error.message}</Text>
      </YStack>
    );
  }

  return (
    <ScrollView>
      <YStack padding="$4" gap="$4">
        <Text fontSize="$8" fontWeight="bold">
          {data?.game.title}
        </Text>
        {/* Rest of content */}
      </YStack>
    </ScrollView>
  );
}
```

### Debounced Search
```typescript
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useSearchGamesQuery } from './use_search_games.generated';

export function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const { data, loading } = useSearchGamesQuery({
    variables: { search: debouncedSearch },
    skip: debouncedSearch.length < 3,
  });

  return (
    <YStack gap="$4" padding="$4">
      <Input
        placeholder="Search games..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      {loading && <Spinner />}
      {/* Results */}
    </YStack>
  );
}
```

## Environment Variables

```env
# .env.local
EXPO_PUBLIC_AUTH0_DOMAIN=your-domain.auth0.com
EXPO_PUBLIC_AUTH0_CLIENT_ID=your-client-id
EXPO_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:3001/graphql

# .env.production
EXPO_PUBLIC_GRAPHQL_ENDPOINT=https://api.your-domain.com/graphql
```

## Troubleshooting

### Common Issues

**Metro bundler cache issues:**
```bash
npx expo start --clear
```

**Android ADB reverse not working:**
```bash
adb reverse tcp:3001 tcp:3001
```

**Expo modules not found:**
```bash
npx expo install --check
```

**Build failing on EAS:**
- Check `eas-build-post-install` hook
- Ensure all env vars are in `eas.json`
- Verify GraphQL endpoint is accessible
