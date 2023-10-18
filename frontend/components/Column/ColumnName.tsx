import { useState } from "react"
import { Input } from "@rneui/themed"
import { ColumnType } from "../../types/Types"
import { View, Text } from "../Themed"
import { useAppDispatch } from "../../redux/hooks"
import { setColumnTitle } from "../../redux/currentTable"
import axios from "axios"
import { useTheme } from "@react-navigation/native"
import { Dimensions } from "react-native";

const ColumnName = ({ column }: { column: ColumnType }) => {
	const width = Dimensions.get('window').width;

	const [newTitle, setNewTitle] = useState(column.title)
	const dispatch = useAppDispatch()
	const API_URL = process.env.EXPO_PUBLIC_API_URL
	const theme = useTheme()

	const handleColumnTitleSave = async () => {
		if (newTitle === column.title) return

		dispatch(setColumnTitle({columnId: column._id, newTitle: newTitle}))
		try {
			const response = await axios.post(`${API_URL}/columns/${column._id}/name`, {
				newTitle: newTitle
			}, {
				withCredentials: true
			})
		} catch (err) {
		}
	}

	return (
		<View className="items-center">
			<Input defaultValue={column.title}
				onChangeText={val => setNewTitle(val)}
				containerStyle={{ width: width / 2 }}
				inputStyle={{textAlign: "center", color: theme.colors.text}}
				onBlur={handleColumnTitleSave}
			></Input>
		</View>
	)
}

export default ColumnName