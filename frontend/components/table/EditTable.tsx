import { useState, useEffect } from "react"
import { ScrollView } from "react-native-gesture-handler"
import { View } from "../Themed"
import { useTheme } from "@react-navigation/native"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { router, useLocalSearchParams } from "expo-router"
import { selectCurrentTable, setCurrentTable } from "../../redux/currentTable"
import axios from "axios"
import { Member, TableType } from "../../types/Types"
import { ActivityIndicator } from "react-native"
import { Button, Input } from "@rneui/themed"
import Colors from "../../constants/Colors"
import TableMembers from "./TableMembers"

const EditTable = () => {

	const currentTableIdFromParams = useLocalSearchParams().tableId
	const [isFetching, setIsFetching] = useState(true)
	const theme = useTheme()
	const dispatch = useAppDispatch()
	const [initialTable, setInitialTable] = useState<TableType>()
	const currentTable = useAppSelector(selectCurrentTable)
	const [tableMembers, setTableMembers] = useState<Member[]>()
	const [isTitleChanged, setIsTitleChanged] = useState(false)
	const [newTableTitle, setNewTableTitle] = useState("")

	const API_URL = process.env.EXPO_PUBLIC_API_URL
	useEffect(() => {
		const getCurrentTableData = async () => {
			try {
				const response = await axios.get(`${API_URL}/tables/${currentTableIdFromParams}`, {
					withCredentials: true,
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json",
					},
				});
				dispatch(setCurrentTable(response.data.data))
				setInitialTable(response.data.data)
			} catch (err) {
				router.back()
			} finally {
				setIsFetching(false)
			}
		}
		getCurrentTableData();
	}, [])

	useEffect(() => {
		const getResponsibleUsers = async () => {
			try {
				const response = await axios.get(`${API_URL}/tables/${currentTableIdFromParams}/members`,
					{
						withCredentials: true,
						headers: {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json",
						},
					},
				);
				setTableMembers(response.data.data)
			} catch (err) {
			} finally {
			}
		}
		getResponsibleUsers();
	}, [])

	useEffect(() => {
		if (isFetching) return
		if (JSON.stringify(newTableTitle) !== JSON.stringify(initialTable?.title)) {
			setIsTitleChanged(true)
		} else {
			setIsTitleChanged(false)
		}
	}, [newTableTitle])

	const handleOnSave = async () => {
		try {
			const response = await axios.post(`${API_URL}/tables/${currentTable._id}/name`,
				{
					newTitle: newTableTitle,
				},
				{
					withCredentials: true,
				})
			dispatch(setCurrentTable(response.data.data))
		} catch (err) {
		}
		setIsTitleChanged(false)
	}

	const handleTitleChange = (newTitle: string) => {
		setNewTableTitle(newTitle)
	}

    return (
      <View>
			<ScrollView
				className="w-full h-full"
				contentContainerStyle={{
					minHeight: "100%",
					paddingVertical: 20,
				}}
			>
				<View className="w-full flex justify-center items-center">
					{isFetching ?
						<ActivityIndicator size="large" color="#311B92" />
						:
						(
							currentTable &&
							(
								<View className="w-full flex justify-center items-center">
									<View className="w-4/5">
										<View className="mt-4">
											<Input onChangeText={handleTitleChange} containerStyle={{ paddingHorizontal: 0 }}
												label="Title" defaultValue={currentTable.title} style={{ color: theme.colors.text }}
											></Input>
										</View>
										{/* <Input containerStyle={{ paddingHorizontal: 0 }} label="Notes" defaultValue={task.notes} style={{ color: theme.colors.text }} multiline></Input> */}
										{tableMembers && <TableMembers tableMembers={tableMembers} setTableMembers={setTableMembers}/> }
										<Button title="Save changes" color={Colors.deepPurple.background}
											containerStyle={{ marginTop: 16 }}
											onPress={handleOnSave}
											disabled={!isTitleChanged}></Button>
									</View>
								</View>
							)
						)
					}
				</View>
			</ScrollView>
		</View>
    )
}

export default EditTable