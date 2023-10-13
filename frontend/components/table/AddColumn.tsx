import { TouchableOpacity } from "react-native-gesture-handler"
import { green } from "../../constants/Colors"
import { View, Text } from "../Themed"
import { Ionicons } from "@expo/vector-icons"

const AddColumn = () => {

    const handleAddColumn = () => {
        
    }

    return (
        <View className="w-36 justify-center items-center flex">
            <TouchableOpacity onPress={handleAddColumn}>
                <View className="p-4 items-center gap-x-2">
                    <Ionicons name="add-circle-outline" size={24} color={green}></Ionicons>
                    <Text>Add column</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default AddColumn