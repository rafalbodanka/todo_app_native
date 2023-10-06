import { useEffect } from "react";
import axios from "axios"
import { setUserData } from "../../redux/user";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectAuth, setIsLoggedIn } from "../../redux/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useFetchUserData = () => {

    const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectAuth)
  const API_URL = process.env.EXPO_PUBLIC_API_URL
  useEffect(() => {
    if (!isLoggedIn) return;
    const getUserData = async () => {
      const cookie = await AsyncStorage.getItem("connect.sid")
      if (!cookie) return
      try {
        const response = await axios.get(`${API_URL}/users/user`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Cookie": cookie,
          },
        });
        if (response.status === 200) {
          dispatch(setIsLoggedIn(true));
          dispatch(setUserData({
            _id: response.data.id,
            email: response.data.email,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            level: response.data.level,
            userIconId: response.data.iconId,
            createdAt: response.data.createdAt,
            updatedAt: response.data.updatedAt,
          }));
        }
      } catch (err) {
        dispatch(setIsLoggedIn(false));
      }
    };
    getUserData();
  }, [isLoggedIn]);
}

export default useFetchUserData;