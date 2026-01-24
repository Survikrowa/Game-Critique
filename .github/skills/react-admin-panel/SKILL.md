---
name: react-admin-panel
description: React admin panel using Vite, TanStack Router, TanStack Query, and Tailwind CSS. Use this skill when working with the web admin interface in apps/web, creating admin features, forms, or data tables.
license: MIT
---

# React Admin Panel Skill

## Overview
This skill covers the React-based admin panel for managing users, games, and system data in the Game Critique project.

## Technology Stack
- **Framework**: React 18.3.1 with TypeScript 5.6.3
- **Build Tool**: Vite 5.4.11
- **Router**: TanStack Router 1.121.24 (type-safe file-based routing)
- **Server State**: TanStack Query 5.62.2 (React Query)
- **UI Framework**: Tailwind CSS 3.4.16 with PostCSS
- **Components**: Radix UI primitives
- **Forms**: React Hook Form 7.54.1 with Zod 3.24.1
- **GraphQL**: Code generation with custom fetcher
- **Authentication**: Auth0 React SDK 2.2.4
- **Icons**: Lucide React 0.468.0
- **Fonts**: Geist font family

## Project Structure

```
apps/web/src/
├── main.tsx                      # App entry point
├── globals.css                   # Global Tailwind styles
├── types.ts                      # GraphQL base types
├── routeTree.gen.ts             # Auto-generated route tree
├── routes/                       # TanStack Router routes
│   ├── __root.tsx               # Root layout
│   ├── _layout/                 # Nested layouts
│   └── _layout.tsx              # Layout component
├── features/                     # Feature modules
│   ├── admin/                   # Admin-specific features
│   │   └── users/               # User management
│   ├── auth/                    # Authentication
│   │   └── use_verify/          # User verification
│   └── layouts/                 # Layout components
│       └── providers/           # App providers
├── packages/                     # Shared packages
│   └── user_roles/              # User role management
├── lib/                         # Utilities
│   └── utils.ts                 # Helper functions
├── codegen/                     # GraphQL codegen config
│   └── fetcher.ts               # Custom GraphQL fetcher
└── assets/                      # Images, fonts, static files
```

## TanStack Router

### File-Based Routing
Routes are automatically generated from the file structure with full TypeScript support.

```typescript
// routes/__root.tsx - Root layout
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
```

### Protected Routes with Auth Context
```typescript
// main.tsx - Router setup with auth context
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function MainApp() {
  const { isAuthenticated } = useAuth0();
  const { data } = useVerifyUserQuery(undefined, {
    enabled: isAuthenticated,
  });

  return (
    <RouterProvider
      router={router}
      context={{
        auth: {
          isAuthenticated: data?.verify.authorized || false,
          role: data?.verify.role || null,
        },
      }}
    />
  );
}
```

### Creating Routes
```typescript
// routes/admin/users.tsx
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

// Search params validation
const searchSchema = z.object({
  page: z.number().optional().default(1),
  search: z.string().optional(),
});

export const Route = createFileRoute('/admin/users')({
  validateSearch: searchSchema,
  beforeLoad: ({ context }) => {
    // Check auth
    if (!context.auth.isAuthenticated || context.auth.role !== 'ADMIN') {
      throw redirect({ to: '/' });
    }
  },
  component: UsersPage,
});

function UsersPage() {
  const { page, search } = Route.useSearch();
  
  return (
    <div>
      {/* Page content */}
    </div>
  );
}
```

### Navigation
```typescript
import { Link, useNavigate } from '@tanstack/react-router';

export function Navigation() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({
      to: '/admin/users',
      search: { page: 1, search: 'john' },
    });
  };

  return (
    <nav>
      <Link to="/admin/users" search={{ page: 1 }}>
        Users
      </Link>
      <button onClick={handleClick}>Navigate</button>
    </nav>
  );
}
```

## TanStack Query (React Query)

### Setup with Providers
```typescript
// features/layouts/providers/providers.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Auth0Provider } from '@auth0/auth0-react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

export function Providers({ children }) {
  return (
    <Auth0Provider
      domain={process.env.VITE_AUTH0_DOMAIN}
      clientId={process.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Auth0Provider>
  );
}
```

### GraphQL Integration with Custom Fetcher
```typescript
// codegen/fetcher.ts
import { useAuth0 } from '@auth0/auth0-react';

export async function fetchData<TData, TVariables>(
  query: string,
  variables?: TVariables,
  token?: string
): Promise<TData> {
  const response = await fetch('http://localhost:3001/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await response.json();

  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data;
}
```

### Using Generated Hooks
```graphql
# features/auth/use_verify/verify_user.graphql
query VerifyUser {
  verify {
    authorized
    role
  }
}
```

```typescript
// Auto-generated hook usage
import { useVerifyUserQuery } from './verify_user.generated';

export function AuthCheck() {
  const { data, isLoading, error } = useVerifyUserQuery(undefined, {
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {data?.verify.authorized ? 'Authorized' : 'Unauthorized'}
      {data?.verify.role && <span>Role: {data.verify.role}</span>}
    </div>
  );
}
```

### Mutations
```graphql
# packages/user_roles/use_update_user_role/update_user_role.graphql
mutation UpdateUserRole($userId: Int!, $role: String!) {
  updateUserRole(userId: $userId, role: $role) {
    success
    message
  }
}
```

```typescript
import { useUpdateUserRoleMutation } from './update_user_role.generated';
import { useQueryClient } from '@tanstack/react-query';

export function UpdateRoleButton({ userId, newRole }) {
  const queryClient = useQueryClient();
  
  const { mutate, isPending } = useUpdateUserRoleMutation({
    onSuccess: () => {
      // Invalidate queries to refetch
      queryClient.invalidateQueries({ queryKey: ['Users'] });
      toast.success('Role updated successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleUpdate = () => {
    mutate({ userId, role: newRole });
  };

  return (
    <button onClick={handleUpdate} disabled={isPending}>
      {isPending ? 'Updating...' : 'Update Role'}
    </button>
  );
}
```

## Tailwind CSS & Styling

### Configuration
```typescript
// tailwind.config.js
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // ... more colors
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

### Utility Function
```typescript
// lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Component Styling
```typescript
import { cn } from '@/lib/utils';

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        className
      )}
      {...props}
    />
  );
}
```

## Radix UI Components

### Building Composable Components
```typescript
// components/ui/dropdown-menu.tsx
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';

export function DropdownMenu(props) {
  return <DropdownMenuPrimitive.Root {...props} />;
}

export function DropdownMenuTrigger({ className, ...props }) {
  return (
    <DropdownMenuPrimitive.Trigger
      className={cn('outline-none', className)}
      {...props}
    />
  );
}

export function DropdownMenuContent({ className, ...props }) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        className={cn(
          'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 shadow-md',
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

// Usage
export function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost">Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### Common Radix Components Used
- **Dialog**: Modals and confirmations
- **Dropdown Menu**: Context menus
- **Select**: Custom select inputs
- **Checkbox**: Custom checkboxes
- **Label**: Accessible form labels
- **Toast**: Notifications
- **Tooltip**: Helpful hints
- **Separator**: Visual dividers
- **Collapsible**: Expandable sections

## Forms with React Hook Form

### Form Pattern with Zod Validation
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['USER', 'ADMIN']),
});

type UserFormData = z.infer<typeof userSchema>;

export function UserForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      role: 'USER',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          {...register('name')}
          className="w-full rounded border p-2"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="w-full rounded border p-2"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded bg-primary px-4 py-2 text-white"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

### Form Components with Radix UI
```typescript
import { Label } from '@radix-ui/react-label';
import { Controller } from 'react-hook-form';
import * as Select from '@radix-ui/react-select';

export function RoleForm() {
  const { control, handleSubmit } = useForm<FormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Controller
          control={control}
          name="role"
          render={({ field }) => (
            <Select.Root value={field.value} onValueChange={field.onChange}>
              <Select.Trigger className="w-full rounded border px-3 py-2">
                <Select.Value placeholder="Select role" />
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="rounded border bg-white shadow-lg">
                  <Select.Item value="USER">User</Select.Item>
                  <Select.Item value="ADMIN">Admin</Select.Item>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          )}
        />
      </div>
    </form>
  );
}
```

## Data Tables with TanStack Table

```typescript
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { useMemo } from 'react';

export function UsersTable({ users }) {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'role',
        header: 'Role',
      },
      {
        id: 'actions',
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button onClick={() => handleEdit(row.original)}>Edit</button>
            <button onClick={() => handleDelete(row.original)}>Delete</button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full border-collapse">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="border p-2 text-left">
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="border p-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

## Authentication with Auth0

```typescript
import { useAuth0 } from '@auth0/auth0-react';

export function LoginButton() {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-4">
        <span>Welcome, {user?.name}</span>
        <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => loginWithRedirect()}>
      Login
    </button>
  );
}
```

## Toast Notifications

```typescript
import { useToast } from '@/hooks/use-toast';

export function useNotifications() {
  const { toast } = useToast();

  const success = (message: string) => {
    toast({
      title: 'Success',
      description: message,
    });
  };

  const error = (message: string) => {
    toast({
      title: 'Error',
      description: message,
      variant: 'destructive',
    });
  };

  return { success, error };
}

// Usage
export function UserActions() {
  const notifications = useNotifications();
  const { mutate } = useDeleteUserMutation({
    onSuccess: () => notifications.success('User deleted'),
    onError: (err) => notifications.error(err.message),
  });

  return (
    <button onClick={() => mutate({ userId: 1 })}>
      Delete User
    </button>
  );
}
```

## Development Commands

```bash
# Development
yarn dev                      # Start Vite dev server (port 5173)
yarn preview                  # Preview production build

# Building
yarn build                    # Production build

# Code Generation
yarn generate-codegen-dev     # Generate GraphQL types from local API

# Code Quality
yarn lint                     # ESLint
yarn format                   # ESLint with auto-fix
```

## Best Practices

1. **Use TanStack Router** for type-safe navigation
2. **Co-locate GraphQL operations** with features
3. **Use Zod** for all form validation
4. **Implement proper error boundaries**
5. **Use TanStack Query** for server state
6. **Follow Radix UI patterns** for accessible components
7. **Use `cn()` utility** for combining Tailwind classes
8. **Implement optimistic updates** for better UX
9. **Use TypeScript strictly** - no `any` types
10. **Keep components small** and focused

## Common Patterns

### Protected Route
```typescript
export const Route = createFileRoute('/admin/settings')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/login' });
    }
    if (context.auth.role !== 'ADMIN') {
      throw redirect({ to: '/' });
    }
  },
  component: SettingsPage,
});
```

### Debounced Search
```typescript
import { useDebounce } from 'use-debounce';

export function SearchUsers() {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);

  const { data } = useUsersQuery(
    { search: debouncedSearch },
    { enabled: debouncedSearch.length >= 3 }
  );

  return (
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search users..."
    />
  );
}
```

### Loading and Error States
```typescript
export function UsersPage() {
  const { data, isLoading, error } = useUsersQuery();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="rounded border border-red-500 bg-red-50 p-4">
        <p className="text-red-700">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      {data?.users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

## Environment Variables

```env
# .env
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_GRAPHQL_ENDPOINT=http://localhost:3001/graphql
```

## Build Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import path from 'node:path';

export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(), // Auto-generates route tree
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173,
  },
});
```
