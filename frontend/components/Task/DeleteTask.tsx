import { Ionicons } from "@expo/vector-icons"
import { Text, View } from "../Themed"
import { TouchableOpacity } from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import axios from "axios"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { selectCurrentTable, setCurrentTable } from "../../redux/currentTable"
import { useTheme } from "@react-navigation/native"

const DeleteTask = () => {

    const taskId = useLocalSearchParams().taskId
    const API_URL = process.env.EXPO_PUBLIC_API_URL
    const currentTableId = useAppSelector(selectCurrentTable)._id
    const dispatch = useAppDispatch()
    const theme = useTheme()

    const handleTaskDelete = async () => {
        try {
            const response = await axios.post(`${API_URL}/tasks/${taskId}/delete`,
            {
                tableId: currentTableId,
            },
            {
                withCredentials: true,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                },
            })
            dispatch(setCurrentTable(response.data.data))
            router.back()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <TouchableOpacity onPress={handleTaskDelete}>
            <View className="flex flex-row items-center gap-1" style={{backgroundColor: theme.colors.card}}>
                <Ionicons name="trash" size={16} color={"#fc8181"}/>
                <Text className="text-red-400 font-bold">Delete</Text>
            </View>
        </TouchableOpacity>
    )
}

export default DeleteTask