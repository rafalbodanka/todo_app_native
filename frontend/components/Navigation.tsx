import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { Link } from "expo-router";
import Logout from "./Logout";
import { TouchableOpacity } from "react-native-gesture-handler";

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
              className="text-center py-8"
              >Invitations</Text>
            </View>
            <View>
              <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
              />
              <TouchableOpacity>
                <Link href="/user-settings" className="text-center py-8">
                  <Text
                  style={styles.title}
                  >User settings</Text>
                </Link>
              </TouchableOpacity>
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
      </View>
    )
}

const styles = StyleSheet.create({
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    separator: {
      height: 2,
      width: "100%",
    },
  });
  

export default Navigation