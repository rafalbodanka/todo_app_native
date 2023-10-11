import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import axios from "axios"
import {ActivityIndicator, View} from 'react-native';
import { router, useNavigation } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { selectAuth, setIsLoggedIn } from "../../redux/auth";
import { useTheme } from "@react-navigation/native";
import { Router } from "expo-router";
type AuthProps = {
  children: React.ReactNode;
};

const Auth: React.FC<AuthProps> = ({
  children,
}) => {

  const theme = useTheme()
  const [isLoading, setIsLoading] = useState(true);
    const API_URL = process.env.EXPO_PUBLIC_API_URL
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(selectAuth)

  useEffect(() => {
    // Check user's login status
    const checkLoginStatus = async () => {
      const cookie = await AsyncStorage.getItem("connect.sid")
      if (!cookie) {
        dispatch(setIsLoggedIn(false))
      }
      try {
        const response = await axios.get(
          `${API_URL}/users/protected`,
          {
            withCredentials: true,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              "Cookie": `connect.sid: ${cookie}`
            },
          }
        );
        if (response.status === 200) {
          dispatch(setIsLoggedIn(true));
        }
      } catch (err) {
        dispatch(setIsLoggedIn(false));
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoading) {
    return (
      <View className="flex w-screen h-screen justify-center items-center">
        <ActivityIndicator size="large" color="#311B92" />
      </View>
    );
  }

  return <>{children}</>;
};

export default Auth