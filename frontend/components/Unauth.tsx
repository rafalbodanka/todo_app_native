import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Platform } from "react-native"
import { Text, View } from "../components/Themed";

const Unauth = () => {

    return (
        <View className="flex w-full h-full justify-center items-center">
            <View className="w-full">
                <View>
                    <View>
                        <View
                            style={styles.separator}
                            lightColor="#eee"
                            darkColor="rgba(255,255,255,0.1)"
                        />
                        <Link href="/login" className="w-full text-center py-8">
                            <Text
                            style={styles.title}
                            className="text-center text-white"
                            >Log in</Text>
                        </Link>
                        <View
                            style={styles.separator}
                            lightColor="#eee"
                            darkColor="rgba(255,255,255,0.1)"
                        />
                    </View>
                </View>
                <View className="mt-8">
                    <View
                        style={styles.separator}
                        lightColor="#eee"
                        darkColor="rgba(255,255,255,0.1)"
                    />
                    <Link href="/signup" className="w-full text-center py-8">
                        <Text
                        style={styles.title}
                        className="text-center"
                        >Create account</Text>
                    </Link>
                    </View>
                    <View
                        style={styles.separator}
                        lightColor="#eee"
                        darkColor="rgba(255,255,255,0.1)"
                    />
                    </View>
                <View>
            </View>
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
      height: 2,
      width: "100%",
    },
  });

export default Unauth