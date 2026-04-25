# React Native Template

A modern, feature-rich React Native template with TypeScript support, state management, navigation, API client, and pre-built UI components. This template is designed to accelerate development while maintaining clean architecture and best practices.

## ✨ Features

### Core Architecture

- ⚡ **React Native 0.83.1** with latest React 19.2.0
- 📝 **TypeScript** support for type safety
- 🎯 **Modular Plugin System** - choose what you need during setup
- 🧪 **Jest Testing** framework pre-configured
- 📱 **iOS & Android** support

### State Management (Choose One)

- 🔴 **Redux** - Redux Toolkit with Redux Thunk for complex state management
- 📦 **Zustand** - Lightweight alternative for simpler state needs
- ✅ **React Query** - Server-state management and data fetching

### Navigation

- 🗺️ **Stack Navigation** - Nested screen navigation
- 📊 **Bottom Tab Navigation** - Tab-based app layouts
- 🔀 **Dynamic Routing** - Programmatic navigation

### UI & Styling

- 🎨 **Theme System** - Light/Dark mode support with customizable colors
- 📐 **Responsive Design** - Scaling utilities for all screen sizes
- 🖼️ **SVG Support** - React Native SVG for scalable graphics
- ✨ **Lottie Animations** - Dynamic animations with Lottie
- 🎭 **Bottom Sheet Modal** - GorhomBottomSheet integration

### API & Networking

- 🌐 **Axios HTTP Client** - Pre-configured with interceptors
- 🔐 **Token Management** - Automatic token refresh and auth headers
- 📡 **Offline Detection** - Network status checking
- 🔄 **Retry Logic** - Automatic request retry mechanism
- 🚨 **Error Handling** - Global error handling

### Storage & Persistence

- 💾 **MMKV Storage** - High-performance encrypted storage
- 🔑 **Auth Storage Utilities** - Token and auth state management
- 🛡️ **Secure Storage** - Encrypted key-value storage

### Pre-built Components

- 🔘 **Button** - Customizable button variants (flat, solid, outline)
- 📝 **Input** - Text input with validation
- 🔐 **PasswordInput** - Secure password field with visibility toggle
- ☑️ **Checkbox** - Custom checkbox component
- 🔄 **AnimatedSwitch** - Animated toggle switch
- 💬 **UIText** - Consistent text styling
- 📱 **CustomToast** - Toast notifications
- 🌐 **NoInternet** - Offline indicator screen
- ⚠️ **ErrorBoundary** - Error handling UI component

### Developer Experience

- 🚀 **ESLint & Prettier** - Code quality and formatting
- 🎯 **Path Aliases** - Clean imports with `@src`, `@components`, `@constants`
- 🔧 **Babel Configuration** - Optimized build setup
- 📱 **Metro Bundler** - React Native bundler configuration
- 🎬 **Post-Init Script** - Automatic setup and plugin installation

## 📦 Installation

### Prerequisites

- **Node.js** ≥ 20
- **npm** or **yarn**
- **Xcode** (for iOS development - macOS only)
- **Android Studio** (for Android development)
- **CocoaPods** (for iOS dependency management)

### Create New Project

```bash
npx react-native init MyProject --template react-native-new-template
```

### Interactive Setup

During initialization, you'll be prompted to select optional plugins:

```
? Select features to include:
❯ ◯ Redux (State Management)
  ◯ Zustand (Lightweight State)
  ◯ React Query (Server State)
  ◯ Navigation (Stack & Navigation patterns)
  ◯ Bottom Tabs (Tab Navigation)
```

The setup script will automatically:

- Install selected dependencies
- Configure plugin modules
- Clean up unused code
- Update TypeScript types

## 🏗️ Project Structure

```
template/
├── src/
│   ├── assets/              # Images, fonts, animations
│   │   ├── animations/      # Lottie JSON files
│   │   ├── fonts/           # Custom fonts
│   │   └── images/          # App images
│   │
│   ├── components/          # Reusable UI components
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── PasswordInput/
│   │   ├── Checkbox/
│   │   ├── UIText/
│   │   ├── CustomToast/
│   │   ├── ErrorBoundary/
│   │   ├── AnimatedLottieView/
│   │   ├── UIBottomSheetModal/
│   │   ├── animatedSwitch/
│   │   ├── IconButton/
│   │   ├── dropDownModal/
│   │   └── svgComponents/
│   │
│   ├── constants/           # App constants
│   │   ├── constants.ts     # General constants
│   │   ├── apiConstants.ts  # API related
│   │   ├── enums.ts         # TypeScript enums
│   │   ├── storage.ts       # Storage keys
│   │   └── animations.ts    # Animation configs
│   │
│   ├── customHooks/         # Custom React hooks
│   │   ├── useAppColorScheme.ts
│   │   ├── useAppState.ts
│   │   ├── useKeyboardStatus.ts
│   │   ├── useRefreshOnFocus.ts
│   │   ├── useStyles.ts
│   │   └── useThemeColors.ts
│   │
│   ├── navigation/          # Navigation setup
│   │   ├── Routes.tsx       # Route definitions
│   │   ├── StackNavigator.tsx
│   │   └── BottomTabsNavigator.tsx
│   │
│   ├── network/             # API & networking
│   │   ├── APIClient.ts     # Axios instance with interceptors
│   │   └── ApiUrls.ts       # API endpoints
│   │
│   ├── screens/             # Screen components
│   │   └── home/
│   │
│   ├── storage/             # Data persistence
│   │   ├── authStorage.ts   # Auth token storage
│   │   └── index.ts         # Storage utilities
│   │
│   ├── store/               # State management (Redux/Zustand)
│   │   ├── index.ts
│   │   ├── useAppState.ts
│   │   └── slices/          # Redux slices
│   │
│   ├── theme/               # Theming
│   │   ├── colors.ts        # Color palette
│   │   ├── fonts.ts         # Font settings
│   │   ├── css.ts           # Global styles
│   │   └── ViewStyles.ts    # View styles
│   │
│   ├── types/               # TypeScript type definitions
│   │   ├── api.d.ts
│   │   ├── components.d.ts
│   │   ├── navigation.d.ts
│   │   └── theme.d.ts
│   │
│   └── utility/             # Helper functions
│       ├── helpers.ts       # Utility functions
│       ├── scaling.ts       # Screen scaling utilities
│       └── index.ts
│
├── __tests__/               # Test files
│   └── App.test.tsx
│
├── App.tsx                  # Root component
├── babel.config.js          # Babel configuration
├── jest.config.js           # Jest testing config
├── metro.config.js          # Metro bundler config
├── tsconfig.json            # TypeScript config
├── package.json             # Dependencies
└── README.md                # This file
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd MyProject
npm install
# or
yarn install
```

### 2. Run on iOS

```bash
npm run ios
# or
npx react-native run-ios
```

### 3. Run on Android

```bash
npm run android
# or
npx react-native run-android
```

### 4. Start Metro Bundler

```bash
npm start
```

### 5. Run Tests

```bash
npm test
```

## 📚 Core Features Guide

### State Management

#### Using Redux

```typescript
// src/store/slices/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: User | null;
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
```

Using in components:

```typescript
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@store/slices/userSlice';

function UserScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleSetUser = () => {
    dispatch(setUser({ id: '1', name: 'John' }));
  };

  return <View>...</View>;
}
```

#### Using Zustand

```typescript
// src/store/useAppState.ts
import create from "zustand";

interface AppStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
```

Using in components:

```typescript
function UserScreen() {
  const { user, setUser } = useAppStore();

  const handleSetUser = () => {
    setUser({ id: '1', name: 'John' });
  };

  return <View>...</View>;
}
```

### API Client

The API client is pre-configured with:

- Token management
- Request/response interceptors
- Offline detection
- Automatic retries
- Error handling

```typescript
// src/network/APIClient.ts
import { apiClient, registerLogoutHandler } from "@network/APIClient";

// Make API request
const fetchUsers = async () => {
  try {
    const response = await apiClient.get("/users");
    return response.data;
  } catch (error) {
    if (error instanceof OfflineError) {
      // Handle offline
    }
    // Handle other errors
  }
};

// Register logout handler
registerLogoutHandler(() => {
  // Clear app state and navigate to login
});
```

### Authentication & Storage

```typescript
import { authStorage } from "@storage/authStorage";

// Store tokens
authStorage.setTokens(accessToken, refreshToken);

// Retrieve tokens
const token = authStorage.getAccessToken();
const refreshToken = authStorage.getRefreshToken();

// Check authentication status
if (authStorage.isAuthenticated()) {
  // User is authenticated
}

// Clear auth on logout
authStorage.clearAuth();
```

### Theme System

```typescript
// Using theme colors
import { useThemeColors } from '@customHooks/useThemeColors';

function MyComponent() {
  const colors = useThemeColors();

  return (
    <View style={{ backgroundColor: colors.PRIMARY_GREEN }}>
      <Text style={{ color: colors.TEXT_PRIMARY }}>Hello</Text>
    </View>
  );
}

// Using app color scheme (light/dark)
import { useAppColorScheme } from '@customHooks/useAppColorScheme';

function ThemeAwareComponent() {
  const isDarkMode = useAppColorScheme() === 'dark';

  return <View>...</View>;
}
```

### Custom Hooks

#### useKeyboardStatus

```typescript
import { useKeyboardStatus } from '@customHooks/useKeyboardStatus';

function LoginForm() {
  const isKeyboardVisible = useKeyboardStatus();

  return <View style={{ marginBottom: isKeyboardVisible ? 100 : 0 }}>...</View>;
}
```

#### useRefreshOnFocus

```typescript
import { useRefreshOnFocus } from '@customHooks/useRefreshOnFocus';

function UserListScreen() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const data = await apiClient.get('/users');
    setUsers(data);
  };

  useRefreshOnFocus(fetchUsers);

  return <FlatList data={users} />;
}
```

#### useStyles

```typescript
import { useStyles } from '@customHooks/useStyles';

function StyledComponent() {
  const styles = useStyles(() =>
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: useThemeColors().WHITE,
      },
    })
  );

  return <View style={styles.container}>...</View>;
}
```

### Pre-built Components

#### Button

```typescript
import { Button } from '@components/Button';

<Button
  title="Login"
  type="solid"
  onPress={handleLogin}
  disabled={isLoading}
  isLoading={isLoading}
/>
```

#### Input

```typescript
import { Input } from '@components/Input';

<Input
  placeholder="Enter email"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
  error={emailError}
/>
```

#### PasswordInput

```typescript
import { PasswordInput } from '@components/PasswordInput';

<PasswordInput
  placeholder="Enter password"
  value={password}
  onChangeText={setPassword}
  error={passwordError}
/>
```

#### CustomToast

```typescript
import Toast from "@components/CustomToast";

Toast.show({
  type: "success",
  text1: "Success",
  text2: "Operation completed successfully",
  duration: 3000,
});
```

#### UIText

```typescript
import { UIText } from '@components/UIText';

<UIText variant="heading1" color="PRIMARY_GREEN">
  Welcome
</UIText>

<UIText variant="body1" color="TEXT_PRIMARY">
  Regular text
</UIText>
```

### Navigation

```typescript
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from '@navigation/StackNavigator';
import { BottomTabsNavigator } from '@navigation/BottomTabsNavigator';

function RootNavigator() {
  return (
    <NavigationContainer>
      {isAuthenticated ? <BottomTabsNavigator /> : <StackNavigator />}
    </NavigationContainer>
  );
}
```

## 🎨 Theming

### Available Themes

- **Light Theme** - Default light color scheme
- **Dark Theme** - Built-in dark mode

### Color Palette

The template includes a comprehensive color system in [template/src/theme/colors.ts](template/src/theme/colors.ts):

```typescript
export const COLORS = {
  PRIMARY_GREEN: "#1D7874",
  LIGHT_SHADE_PRIMARY_GREEN: "#329C98",
  BLACK: "#444E5B",
  WHITE: "#fff",
  RED: "#FF7474",
  BLUE: "#5865F2",
  // ... and more
};
```

### Font Configuration

Fonts are configured in [template/src/theme/fonts.ts](template/src/theme/fonts.ts) with:

- Font families
- Font sizes
- Font weights
- Line heights

## 🧪 Testing

The template includes Jest pre-configured for testing:

```bash
npm test
```

Example test file: [template/**tests**/App.test.tsx](template/__tests__/App.test.tsx)

```typescript
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

describe('<App />', () => {
  it('renders correctly', () => {
    renderer.create(<App />);
  });
});
```

## 🛠️ Environment Variables

Create a `.env` file in the template root:

```
API_BASE_URL=https://api.example.com
API_REQUEST_TIMEOUT=10000
```

Access in code:

```typescript
import { API_BASE_URL } from "@env";
```

## 📱 Available Scripts

```bash
# Start Metro Bundler
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run tests
npm test

# Lint code
npm run lint
```

## 🔧 Configuration Files

### TypeScript Configuration

- [template/tsconfig.json](template/tsconfig.json) - TypeScript compiler options
- Path aliases: `@src`, `@components`, `@constants`, `@assets`, `@navigation`, `@network`, `@storage`, `@store`, `@theme`, `@types`, `@utility`

### Babel Configuration

- [template/babel.config.js](template/babel.config.js) - Babel presets and plugins

### Metro Configuration

- [template/metro.config.js](template/metro.config.js) - React Native Metro Bundler config

### Jest Configuration

- [template/jest.config.js](template/jest.config.js) - Testing framework setup

## 📦 Dependencies

### Production

- **react** - UI library
- **react-native** - Mobile framework
- **axios** - HTTP client
- **@react-native-community/netinfo** - Network status
- **react-native-mmkv** - High-performance storage
- **lottie-react-native** - Animation library
- **react-native-reanimated** - Gesture and animation library
- **@gorhom/bottom-sheet** - Bottom sheet modal
- **react-native-toast-message** - Toast notifications
- **react-native-svg** - SVG support

### State Management

- **@reduxjs/toolkit** - Redux with utilities
- **react-redux** - React bindings for Redux
- **zustand** - Lightweight state management
- **@tanstack/react-query** - Server state management

### Development

- **TypeScript** - Type safety
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **Babel** - JavaScript transpiler

## 🤝 Contributing

When adding new features to this template:

1. Follow the existing project structure
2. Add TypeScript types
3. Document new components in README
4. Ensure tests pass
5. Use path aliases for imports

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details

## 👤 Author

**Abhishek Rathore**

- Email: ab.r4thore@gmail.com
- GitHub: [hsemo](https://github.com/hsemo)

## 🤔 Troubleshooting

### Pod installation issues (iOS)

```bash
cd template/ios
rm -rf Podfile.lock Pods
pod install
```

### Android build issues

```bash
cd template/android
./gradlew clean
./gradlew build
```

### Metro Bundler cache issues

```bash
npm start -- --reset-cache
```

### TypeScript errors

```bash
npm run lint
```

## 📞 Support

For issues and questions:

- Check the [GitHub Repository](https://github.com/hsemo/react-native-template)
- Review the project structure and examples
- Check console logs and error messages

---

**Happy coding! 🚀**
