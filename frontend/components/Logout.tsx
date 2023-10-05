import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableHighlight } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { Text } from "react-native"
import { router } from "expo-router";
import axios from "axios";
import { setIsLoggedIn } from "../redux/auth";
import { useAppDispatch } from "../redux/hooks";
import { useTheme } from "@react-navigation/native";
const Logout = () => {

    const API_URL = process.env.EXPO_PUBLIC_API_URL
    const dispatch = useAppDispatch()
    const theme = useTheme()
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("connect.sid");
            const response = await axios.get(`${API_URL}/users/logout`, {
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Content-Type": "application/json",
                },
              });
            if (response.status === 200) {
                dispatch(setIsLoggedIn(false))
                router.back()
            }
        } catch (error) {

        }
    }

    return (
        <TouchableHighlight onPress={handleLogout}>
            <Text
              style={{...styles.title, color: theme.colors.text}}
              className="text-center"
              >Logout</Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    separator: {
      marginVertical: 30,
      height: 2,
      width: "100%",
    },
  });

export default Logout