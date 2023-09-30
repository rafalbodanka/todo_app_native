import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
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

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="unauth" options={{
              headerTitle: "Sign up",
              headerTitleAlign: "center"
            }} />
            <Stack.Screen name="login" options={{
              presentation: "modal",
              headerTitle: "Log in"
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
          </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  </Provider>
  );
}
