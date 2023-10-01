import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native"
import { View } from "../components/Themed";
import { Button } from "@rneui/themed";

const Unauth = () => {

    return (
        <View className="flex w-full h-full justify-center items-center">
            <View className="flex justify-center flex-col gap-8">
                <View className="w-1/2">
                    <Button color={"#311B92"}>
                        <Link href="/login"
                        className="h-full w-full text-[#F2F2F2] uppercase font-bold text-center">Log in
                        </Link>
                    </Button>
                </View>
                <View className="w-1/2">
                    <Button color={"#311B92"}>
                        <Link href="/signup"
                        className="h-full w-full text-[#F2F2F2] uppercase font-bold text-center">Create account
                        </Link>
                    </Button>
                </View>
            </View>
            <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        </View>
    )
}

export default Unauth