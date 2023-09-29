import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { Link } from "expo-router";
import Logout from "./Logout";

const Navigation = () => {

    return (
        <View className="w-screen flex-1 flex-row justify-center">
        <View className="flex-1 flex-col">
          <View>
            <View>
              <View
                style={styles.separator}
                className=" flex flex-row justify-center"
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
              />
              <Text
              style={styles.title}
              className="text-center"
              >Invitations</Text>
            </View>
            <View>
              <View
                style={styles.separator}
                className=""
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
              />
              <Text
              style={styles.title}
              className="text-center"
              >User settings</Text>
              </View>
            <View>
              <View
                style={styles.separator}
                className=""
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
              />
              <Logout />
            </View>
          </View>
        </View>
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </View>
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
  

export default Navigation