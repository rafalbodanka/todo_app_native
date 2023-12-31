import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  useTheme,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, useColorScheme } from "react-native";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import ModalHeader from "../components/ModalHeader";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAppSelector } from "../redux/hooks";
import { selectAuth } from "../redux/auth";
import DeleteTask from "../components/task/DeleteTask";
import { ColorSchemeStore } from "nativewind/dist/style-sheet/color-scheme";
import Colors from "../constants/Colors";
import { ThemeConsumer } from "@rneui/themed";
import DeleteTable from "../components/table/DeleteTable";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const CustomDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    transparent: 'transparent',
  },
}

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    transparent: 'transparent',
  },
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider value={colorScheme === "dark" ? CustomDarkTheme : CustomDefaultTheme}>
          <Stack screenOptions={{
              navigationBarColor:
              colorScheme === "dark" ?
              CustomDarkTheme.colors.transparent
              : CustomDefaultTheme.colors.transparent,
              statusBarHidden: false,
            statusBarColor: Colors.deepPurple.background,
            }}>
            <Stack.Screen name="unauth" options={{
              headerTitle: "Sign up",
              headerTitleAlign: "center",
            }}/>
            <Stack.Screen name="login" options={{
              presentation: "modal",
              headerTitle: "Log in",
              }} />
            <Stack.Screen name="signup" options={{
              presentation: "modal",
              headerTitle: "Create account"
          }} />
            <Stack.Screen name="index" options={{
              headerShown: false,
              }} />
            <Stack.Screen name="tables" options={{
              headerTitle: "Tables",
              presentation: "modal",
            }} />
            <Stack.Screen name="add-task" options={{
              headerTitle: "Add task",
              presentation: "modal",
            }} />
            <Stack.Screen name="navigation" options={{
              headerTitle: "Navigation",
              presentation: "modal",
            }} />
            <Stack.Screen name="user-settings" options={{
              headerTitle: "User settings",
              presentation: "modal",
            }} />
            <Stack.Screen name="edit-task" options={{
              headerTitle: "Edit task",
              headerRight: () => <DeleteTask></DeleteTask>,
              presentation: "modal",
              }}
              initialParams={{ taskId: '' }}
            />
            <Stack.Screen name="edit-table" options={{
              headerTitle: "Edit table",
              headerRight: () => <DeleteTable></DeleteTable>,
              presentation: "modal",
              }}
              initialParams={{ tableId: '' }}
            />
            <Stack.Screen name="invitations" options={{
              headerTitle: "Invitations",
              presentation: "modal",
              }}
            />
          </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  </Provider>
  );
}
