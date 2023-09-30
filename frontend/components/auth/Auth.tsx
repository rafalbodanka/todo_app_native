import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import axios from "axios"
import {ActivityIndicator, View} from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setIsLoggedIn } from "../../redux/auth";

type AuthProps = {
  children: React.ReactNode;
};

const Auth: React.FC<AuthProps> = ({
  children,
}) => {

  const [isLoading, setIsLoading] = useState(true);
    const API_URL = process.env.EXPO_PUBLIC_API_URL
    const dispatch = useAppDispatch()

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
      <View className="flex w-screen h-screen bg-neutral-900 justify-center items-center">
        <ActivityIndicator size="large" color="#311B92" />
      </View>
    );
  }

  return <>{children}</>;
};

export default Auth