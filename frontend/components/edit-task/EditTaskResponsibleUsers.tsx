import { Member, TaskType, User } from "../../types/Types"
import { View, Text } from "../Themed"
import { useTheme } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import SelectDropdown from "react-native-select-dropdown";
import { almostBlack, } from "../../constants/Colors";

const EditTaskResponsibleUsers = (
	{ responsibleUsers, task, setTask }:
		{
			responsibleUsers: Member[];
			task: TaskType | undefined;
			setTask: React.Dispatch<React.SetStateAction<TaskType | undefined>>;
		}) => {

	const theme = useTheme()

	const handleUserDelete = (deletedUserId: string) => {
		if (!task) return
		const newTaskUsers = task.responsibleUsers.filter(user => user._id !== deletedUserId)
		setTask({...task, responsibleUsers: newTaskUsers})
	}

	const unassignedMembers = responsibleUsers.map(tableMember => tableMember.user)
	.filter(tableMember => {
		return !task?.responsibleUsers.some(user => user._id === tableMember._id);
	})

	return (
		<View>
			<View className="flex flex-row items-center">
				<Text style={{ color: theme.colors.text, fontSize: 20 }}>Assigned users</Text>
				<SelectDropdown
						rowTextStyle={{color: 'black'}}
						buttonStyle={{ backgroundColor: theme.colors.card,
						display: "flex",
						paddingHorizontal: 0,
						justifyContent: "center",
						height: "auto",
						}}
					renderCustomizedButtonChild={() =>
						<TouchableOpacity className="flex ml-4 flex-row items-center" containerStyle={{backgroundColor: theme.colors.background}}>
						<Ionicons name="person-add" size={18} color={theme.colors.text}></Ionicons>
						<Text className="ml-2">Assign</Text>
					</TouchableOpacity>
					}
					data={unassignedMembers
						.map(filteredMember => {
							return filteredMember.email
						})}
					onSelect={(item, index) => {
						task &&	setTask({...task, responsibleUsers: [...task.responsibleUsers, unassignedMembers[index]]})
					}}
					/>
			</View>
		<View className="flex w-full">
			{task && task.responsibleUsers.length >= 1 &&
				(
						<View className="flex w-full">
						{task.responsibleUsers.map(user => {
							return (
								<View key={user._id}
									className="flex mt-4 flex-row justify-between w-full items-center bg-neutral-200 p-2 px-4 rounded-lg">
									<Text style={{ color: almostBlack, fontSize: 20 }}>{user.email}</Text>
									<View className="bg-neutral-200">
										<TouchableOpacity onPress={() => handleUserDelete(user._id)}>
											<Ionicons name="person-remove" size={24}></Ionicons>
										</TouchableOpacity>
									</View>
								</View>
							)
						})}
						</View>
				)}
		</View>
		</View>
	)
}

export default EditTaskResponsibleUsers