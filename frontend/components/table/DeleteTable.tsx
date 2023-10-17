import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, View } from "../Themed";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { selectCurrentTable, setCurrentTable } from "../../redux/currentTable";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";
import { setTables } from "../../redux/tables";

const DeleteTable = () => {

    const API_URL = process.env.EXPO_PUBLIC_API_URL
    const currentTableId = useAppSelector(selectCurrentTable)._id
    const dispatch = useAppDispatch()
    const theme = useTheme()

    const handleTableDelete = async () => {
        try {
            const response = await axios.post(`${API_URL}/tables/delete/${currentTableId}`,
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
            dispatch(setTables(response.data.data))
            response.data.data.length > 0 ?
            dispatch(setCurrentTable(response.data.data.length[0]))
            :
            dispatch(setCurrentTable({columns: [],
                title: "",
                users: [],
                __v: 0,
                _id: "",
            }))
            router.replace('/')
        } catch (err) {
        }
    }

    return (
        <TouchableOpacity onPress={handleTableDelete}>
            <View className="flex flex-row items-center gap-1" style={{backgroundColor: theme.colors.card}}>
                <Ionicons name="trash" size={16} color={"#fc8181"}/>
                <Text className="text-red-400 font-bold">Delete</Text>
            </View>
        </TouchableOpacity>
    )
}

export default DeleteTable;