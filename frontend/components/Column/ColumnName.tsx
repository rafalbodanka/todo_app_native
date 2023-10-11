import { useState } from "react"
import { Input } from "@rneui/themed"
import { ColumnType } from "../../types/Types"
import { View, Text } from "../Themed"
import { useAppDispatch } from "../../redux/hooks"
import { setColumnTitle } from "../../redux/currentTable"
import axios from "axios"
import { useTheme } from "@react-navigation/native"

const ColumnName = ({ column }: { column: ColumnType }) => {

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
			console.log(err)
		}
	}

	return (
		<View className="flex flex-row justify-center">
			<Input defaultValue={column.title}
				onChangeText={val => setNewTitle(val)}
				containerStyle={{width: 240}}
				inputStyle={{textAlign: "center", color: theme.colors.text}}
				onBlur={handleColumnTitleSave}
			></Input>
		</View>
	)
}

export default ColumnName