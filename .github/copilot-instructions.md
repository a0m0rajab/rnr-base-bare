# Copilot Instructions for RNR Base Bare

## Architecture Overview

This is a React Native/Expo starter kit with:

- **Expo Router** for file-based navigation (`app/` directory structure)
- **NativeWind v4** for styling (Tailwind CSS for React Native)
- **Supabase** for authentication and database
- **React Native Reusables** UI components with shadcn/ui patterns

## Key Patterns & Conventions

### File Structure & Navigation

- Routes are in `app/` with file-based routing via Expo Router
- Protected routes use `Stack.Protected` with session guards in `app/_layout.tsx`
- Tab navigation lives in `app/(app)/(tabs)/`
- Authentication flows are separated: signed-out users see `sign-in.tsx`, signed-in users see `(app)` group

### Authentication Pattern

- Session management uses `utils/ctx.tsx` with `SessionProvider` context
- Storage is handled by `useStorageState` hook with AsyncStorage persistence
- Supabase client configured in `utils/supabase.ts` with AsyncStorage for session persistence
- Auth state drives route protection via `Stack.Protected` guards

### Styling System

- NativeWind v4 with `global.css` imported in layout files
- Theme system uses CSS variables (HSL format) defined in `tailwind.config.js`
- Dark/light mode via `useColorScheme()` hook from nativewind
- Platform-specific styles use `web:` prefix for web-only styles
- UI components follow shadcn/ui patterns with `cva` (class-variance-authority)

### Component Architecture

- UI components in `components/ui/` follow shadcn/ui structure
- Custom icons use `lucide-react-native` in `lib/icons/`
- Components use `@rn-primitives/*` for accessibility and cross-platform consistency
- Theme colors use CSS custom properties: `hsl(var(--primary))` pattern
- for any further components you should download them from react-native-reusables by using: `npx @react-native-reusables/cli@latest add menubar` command, here is list of the components
  - Accordion
  - Alert
  - Alert Dialog
  - Aspect Ratio
  - Avatar
  - Badge
  - Button
  - Card
  - Checkbox
  - Collapsible
  - Context Menu
  - Dialog
  - Dropdown Menu
  - Hover Card
  - Input
  - Label
  - Menubar
  - Navigation Menu
  - Popover
  - Progress
  - Radio Group
  - Select
  - Separator
  - Skeleton
  - Switch
  - Table
  - Tabs
  - Text
  - Textarea
  - Toggle
  - Toggle Group
  - Tooltip
  - Typography

### Platform-Specific Handling

- Android navigation bar theming in `lib/android-navigation-bar.ts`
- Web-specific setup with `useSetWebBackgroundClassName`
- Platform detection via `Platform.select()` for conditional logic
- StatusBar component from expo-status-bar for cross-platform status bar styling

## Development Workflows

### Essential Commands

```bash
npm run dev          # Start development server with cache clear
npm run dev:web      # Web-specific development
npm run dev:android  # Android-specific development
npm run clean        # Clean .expo and node_modules
```

### Environment Setup

- Requires `.env` file with `EXPO_PUBLIC_DATABASE_URL` and `EXPO_PUBLIC_DATABASE_ANON_KEY`
- Supabase database schema should follow user management template
- Uses `expo-secure-store` for sensitive data storage on native platforms

### Theme Development

- Theme colors defined in `lib/constants.ts` as `NAV_THEME`
- Component variants use `cva` with responsive size patterns: `native:h-12` for native-specific sizing
- ThemeToggle component demonstrates cross-platform theme switching with Android nav bar integration

### Key Files to Reference

- `app/_layout.tsx` - Root navigation and auth routing
- `utils/ctx.tsx` - Authentication context pattern
- `components/ui/button.tsx` - Component variant system example
- `lib/useColorScheme.tsx` - Theme management hook
- `tailwind.config.js` - Theme configuration with CSS variables
