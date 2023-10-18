import { useState } from "react"
import { TouchableOpacity } from "react-native"
import Colors, { green } from "../../constants/Colors"
import { View, Text } from "../Themed"
import { Ionicons } from "@expo/vector-icons"
import axios from "axios"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { selectCurrentTable, setColumns, setCurrentTable } from "../../redux/currentTable"
import ReactNativeModal from "react-native-modal"
import { Button, Input } from "@rneui/themed"
import { useTheme } from "@react-navigation/native"
import { selectTables, setTables } from "../../redux/tables"

const AddTable = ({isInHeader} : {isInHeader: boolean}) => {
	
    const API_URL = process.env.EXPO_PUBLIC_API_URL
    const currentTable = useAppSelector(selectCurrentTable)
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const [isAddNewTableModalOpen, setIsAddNewTableModalOpen] = useState(false)
    const [newTableTitle, setNewTableTitle] = useState("")
    const tables = useAppSelector(selectTables)

    const handleAddTable = async () => {
        try {
            const response = await axios.post(`${API_URL}/tables/create`, 
            {
                title: newTableTitle,
            })
            dispatch(setTables(response.data.data))
            dispatch(setCurrentTable(response.data.data[response.data.data.length - 1]))
        } catch(err) {
        }
    }

    return (
        <>
        {isInHeader ? 
            <TouchableOpacity onPress={() => setIsAddNewTableModalOpen(true)}>
                <View className="flex-row justify-center items-center p-2 pt-3" style={{backgroundColor: theme.colors.card}}>
                    <Text>Add table</Text>
                </View>
            </TouchableOpacity>
        :
            <View className={`${tables.length > 0 ? "w-36 justify-center items-center flex" : "w-screen h-full flex justify-center items-center" }`}>
                <TouchableOpacity onPress={() => setIsAddNewTableModalOpen(true)}>
                    <View className="p-4 items-center gap-x-2">
                        <Ionicons name="add-circle-outline" size={24} color={green}></Ionicons>
                        <Text>Add table</Text>
                    </View>
                </TouchableOpacity>
            </View>
        }
            <ReactNativeModal
				isVisible={isAddNewTableModalOpen}
				onBackdropPress={() => setIsAddNewTableModalOpen(false)}
				onModalHide={() => setNewTableTitle("")}
				animationIn={"fadeInRightBig"}
			>
				<View className="p-8 rounded-lg" style={{backgroundColor: theme.colors.card}}>
					<Input onChangeText={setNewTableTitle} containerStyle={{ paddingHorizontal: 0 }}
						label={"Table name"} style={{ color: theme.colors.text }}
					></Input>
					<View className="w-full flex flex-row justify-center" style={{backgroundColor: theme.colors.card}}>
						<View>
							<Button
								color={Colors.deepPurple.background}
								titleStyle={{ color: Colors.deepPurple.text }}
								onPress={handleAddTable}
							>Add table</Button>
						</View>
					</View>
                    <View className="items-center" style={{backgroundColor: theme.colors.card}}>
                        <TouchableOpacity
                        className="mt-6 p-2"
                        onPress={() => setIsAddNewTableModalOpen(false)}>
                                <Text style={{color: theme.colors.text}}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
				</View>
			</ReactNativeModal>
        </>
    )
}

export default AddTable;