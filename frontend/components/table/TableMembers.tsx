import { useEffect, useState } from "react"
import { useTheme } from "@react-navigation/native";
import { Member, User } from "../../types/Types";
import { View, Text } from "../Themed";
import EditTableAddMember from "./EditTableAddMember";
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native";
import axios from "axios";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentTable } from "../../redux/currentTable";
import { selectUser } from "../../redux/user";
import ReactNativeModal from "react-native-modal";
import { Button } from "@rneui/themed";
import Colors, { red } from "../../constants/Colors";

const TableMembers = ({
	tableMembers, setTableMembers
}:
	{
		tableMembers: Member[],
		setTableMembers: React.Dispatch<React.SetStateAction<Member[] | undefined>>;
	}) => {

	const theme = useTheme()
	const API_URL = process.env.EXPO_PUBLIC_API_URL
	const tableId = useAppSelector(selectCurrentTable)._id
	const currentUser = useAppSelector(selectUser)
	const currentUserPermission = tableMembers
		.find(member => member.user._id === currentUser._id)?.permission || 'none';
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const [memberToDelete, setMemberToDelete] = useState<User | null>()

	const handleDeleteMember = async (userId: string) => {
		try {
			const response = await axios.post(`${API_URL}/tables/${tableId}/remove-member`,
				{
					memberId: userId,
				})
			setTableMembers(response.data.data)
			closeDeleteModal()
		} catch (err) {
		}
	}

	const openDeleteModal = (member: User) => {
		setIsDeleteModalOpen(true)
		setMemberToDelete(member)
	}

	const closeDeleteModal = () => {
		setIsDeleteModalOpen(false)
	}

	return (
		<View>
			<View className="flex flex-row justify-between">
				<Text className="font-bold text-[16px]">Table members</Text>
				{['admin', 'invite'].includes(currentUserPermission) &&
					<EditTableAddMember />
				}
			</View>
			<View className="mt-2">
				{tableMembers?.map(member => {
					return (
						<View key={member.user._id}
							style={{ borderColor: theme.colors.text }}
							className="border-[1px] flex flex-row justify-between mt-2 rounded-sm">
							<View className="flex justify-center p-2">
								<Text>{currentUser._id === member.user._id && <Text className="font-bold">(You) </Text>}
									<Text>{member.user.firstName} {member.user.lastName}</Text>
								</Text>
								<Text>
									{member.user.email}
								</Text>
								<Text>
									{member.user.level}
								</Text>
							</View>
							{currentUser._id !== member.user._id && currentUserPermission === 'admin'
								&&
								<TouchableOpacity onPress={() => openDeleteModal(member.user)} className="flex justify-center p-4">
									<Ionicons name="person-remove" size={16} color={theme.colors.text}></Ionicons>
								</TouchableOpacity>
							}
						</View>
					)
				})}
			</View>
			<ReactNativeModal
				isVisible={isDeleteModalOpen}
				onBackdropPress={closeDeleteModal}
				animationIn={"fadeInRightBig"}
			>
				<View className="p-8 rounded-lg">
					<Text className="text-center"
						style={{ color: theme.colors.text }}
					>Do you want to remove member <Text className="font-bold">{memberToDelete?.firstName} {memberToDelete?.lastName}</Text>?
					</Text>
					<View className="w-full flex flex-row justify-center gap-x-8 mt-8">
						<View className="w-24">
							<Button
								color={red}
								titleStyle={{ color: Colors.deepPurple.text }}
								onPress={() => handleDeleteMember(memberToDelete!._id)}
							>Remove</Button>
						</View>
						<View className="w-24">
							<Button
								color={Colors.deepPurple.background}
								titleStyle={{ color: Colors.deepPurple.text }}
								onPress={closeDeleteModal}
							>Cancel</Button>
						</View>
					</View>
				</View>
			</ReactNativeModal>
		</View>
	)

}

export default TableMembers;