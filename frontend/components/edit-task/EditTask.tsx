import { useEffect, useState } from "react"
import { useLocalSearchParams } from "expo-router"
import { View, Text } from "../Themed"
import { ActivityIndicator } from 'react-native';
import axios from "axios"
import { Member, TaskType, User } from "../../types/Types";
import { Input, Button, CheckBox, Slider, Icon } from "@rneui/themed";
import { useTheme } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import formatDistance from "date-fns/formatDistance";
import { ScrollView } from "react-native-gesture-handler";
import EditTaskDifficultySlider from "./EditTaskDifficultySlider";
import EditTaskEstimationCheckbox from "./EditTaskEstimationCheckbox";
import EditTaskCalendarPicker from "./EditTaskCalendarPicker";
import EditTaskIsCompleted from "./EditTaskIsCompleted";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectCurrentTable, setColumns, setCurrentTable } from "../../redux/currentTable";
import EditTaskResponsibleUsers from "./EditTaskResponsibleUsers";

const EditTask = () => {

	const [isFetching, setIsFetching] = useState(true)
	const [task, setTask] = useState<TaskType>()
	const [initialTask, setInitialTask] = useState<TaskType>()
	const theme = useTheme()
	const dispatch = useAppDispatch()
	const taskId = useLocalSearchParams().taskId
	const [isChanged, setIsChanged] = useState(false)
	const [responsibleUsers, setResponsibleUsers] = useState<Member[]>([])
	const currentTableId = useAppSelector(selectCurrentTable)._id

	const API_URL = process.env.EXPO_PUBLIC_API_URL

	useEffect(() => {
		const getTaskData = async () => {
			try {
				const response = await axios.get(`${API_URL}/tasks/${taskId}`, {
					withCredentials: true,
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json",
					},
				});
				setTask(response.data.data)
				setInitialTask(response.data.data)
				// dispatch(setTask(response.data.data)) setting task in redux state too
			} catch (err) {
				console.log(err)
			} finally {
				setIsFetching(false)
			}
		}
		getTaskData();
	}, [])

	useEffect(() => {
		if (!task) return
		const getResponsibleUsers = async () => {
			try {
				const response = await axios.get(`${API_URL}/tables/${currentTableId}/members`,
					{
						withCredentials: true,
						headers: {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json",
						},
					},
				);
				setResponsibleUsers(response.data.data)
			} catch (err) {
				console.log(err)
			} finally {
			}
		}
		getResponsibleUsers();
	}, [task])

	useEffect(() => {
		if (isFetching) return
		if (JSON.stringify(task) !== JSON.stringify(initialTask)) {
			setIsChanged(true)
		} else {
			setIsChanged(false)
		}
	}, [task])

	const handleOnSave = () => {
		const taskToSend = {
			...task,
			responsibleUsers: task?.responsibleUsers.map(user => user._id)
		}
		
		const updateTask = async () => {
			try {
				const response = await axios.patch(`${API_URL}/tasks/${task?._id}/update`,
					{
						task: taskToSend,
						currentTableId: currentTableId
					},
					{
						withCredentials: true,
					})
				dispatch(setCurrentTable(response.data.data))
			} catch (err) {
				console.log(err)
			}
		}
		updateTask();
		setIsChanged(false)
	}

	const handleTitleChange = (newTitle: string) => {
		task && setTask({ ...task, title: newTitle })
	}

	return (
		<View>
			<ScrollView
				className="w-full h-full"
				contentContainerStyle={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					minHeight: "100%",
					paddingVertical: 20,
				}}
			>
				<View className="w-full flex justify-center items-center">
					{isFetching ?
						<ActivityIndicator size="large" color="#311B92" />
						:
						(
							task &&
							(
								<View className="w-full flex justify-center items-center">
									<View className="w-4/5">
										{task.createdAt &&
											<Text className="text-gray-500">{`Created on ${formatDistance(new Date(task.createdAt), new Date(), { addSuffix: true })}`}
											</Text>
										}
										<Text className="text-gray-500">{`Updated on ${formatDistance(new Date(task.updatedAt), new Date(), { addSuffix: true })}`}</Text>
										<EditTaskIsCompleted task={task} setTask={setTask} />
										<View className="mt-4">
											<Input onChangeText={handleTitleChange} containerStyle={{ paddingHorizontal: 0 }}
												label="Title" defaultValue={task.title} style={{ color: theme.colors.text }}
											></Input>
										</View>
										<EditTaskEstimationCheckbox task={task} setTask={setTask} />
										{task.isEstimated &&
											<View>
												<EditTaskDifficultySlider task={task} setTask={setTask} />
												<EditTaskCalendarPicker task={task} setTask={setTask} />
											</View>
										}
										<Input containerStyle={{ paddingHorizontal: 0 }} label="Notes" defaultValue={task.notes} style={{ color: theme.colors.text }} multiline></Input>
										<EditTaskResponsibleUsers
											responsibleUsers={responsibleUsers}
											task={task}
											setTask={setTask}
											/>
										<Button title="Save changes" color={Colors.deepPurple.background}
											containerStyle={{ marginTop: 16 }}
											onPress={handleOnSave}
											disabled={!isChanged}></Button>
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

export default EditTask