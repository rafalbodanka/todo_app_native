import { ActivityIndicator } from "react-native";
import { View } from "./Themed";

export default function Loader() {
    return (
    <View className="w-full h-full flex justify-center items-center">
        <ActivityIndicator size="large" color="#311B92" />
    </View>
    )
}