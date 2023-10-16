import { useState } from "react"
import { TouchableOpacity } from "react-native"
import Colors, { green } from "../../constants/Colors"
import { View, Text } from "../Themed"
import { Ionicons } from "@expo/vector-icons"
import axios from "axios"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { selectCurrentTable, setCurrentTable } from "../../redux/currentTable"
import ReactNativeModal from "react-native-modal"
import { Button, Input } from "@rneui/themed"
import { useTheme } from "@react-navigation/native"
import { selectTables } from "../../redux/tables"

const AddColumn = () => {

    const API_URL = process.env.EXPO_PUBLIC_API_URL
    const currentTable = useAppSelector(selectCurrentTable)
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const [isAddNewColumnModalOpen, setIsAddNewColumnModalOpen] = useState(false)
    const [newColumnTitle, setNewColumnTitle] = useState("")
    const tables = useAppSelector(selectTables)

    const handleAddColumn = async () => {
        try {
            const response = await axios.post(`${API_URL}/columns/create`, 
            {
                title: newColumnTitle,
                tableId: currentTable._id
            })
            dispatch(setCurrentTable(response.data.data))
            setIsAddNewColumnModalOpen(false)
            setNewColumnTitle("")
        } catch(err) {

        }
    }

    return (
        <>
            <View className={`${tables.length > 0 ? "w-36 justify-center items-center flex" : "w-screen h-full flex justify-center items-center" }`}>
                <TouchableOpacity onPress={() => setIsAddNewColumnModalOpen(true)}>
                    <View className="p-4 items-center gap-x-2">
                        <Ionicons name="add-circle-outline" size={24} color={green}></Ionicons>
                        <Text>Add column</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <ReactNativeModal
				isVisible={isAddNewColumnModalOpen}
				onBackdropPress={() => setIsAddNewColumnModalOpen(false)}
				onModalHide={() => setNewColumnTitle("")}
				animationIn={"fadeInRightBig"}
			>
				<View className="p-8 rounded-lg">
					<Input onChangeText={setNewColumnTitle} containerStyle={{ paddingHorizontal: 0 }}
						label={"Column title"} style={{ color: theme.colors.text }}
					></Input>
					<View className="w-full flex flex-row justify-center">
						<View>
							<Button
								color={Colors.deepPurple.background}
								titleStyle={{ color: Colors.deepPurple.text }}
								onPress={handleAddColumn}
							>Add column</Button>
						</View>
					</View>
                    <View className="items-center">
                        <TouchableOpacity
                        className="mt-6 bg-red-400 p-2"
                        onPress={() => setIsAddNewColumnModalOpen(false)}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
				</View>
			</ReactNativeModal>
        </>
    )
}

export default AddColumn