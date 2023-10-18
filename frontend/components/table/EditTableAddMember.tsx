import { Button, Input, Text } from "@rneui/themed"
import { View } from "../Themed"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "@react-navigation/native"
import ReactNativeModal from "react-native-modal"
import { useState } from "react"
import { TouchableOpacity } from "react-native"
import Colors from "../../constants/Colors"
import axios from "axios"
import { useAppSelector } from "../../redux/hooks"
import { selectUser } from "../../redux/user"
import { selectCurrentTable } from "../../redux/currentTable"

const EditTableAddMember = () => {
	const theme = useTheme()
	const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false)
	const [email, setEmail] = useState("")
	const [isEmailValid, setIsEmailValid] = useState(true)
	const [invalidEmailMessage, setInvalidEmailMessage] = useState("")
	const [InputLabel, setInputLabel] = useState("Invitee email")
	const API_URL = process.env.EXPO_PUBLIC_API_URL
	const currentUser = useAppSelector(selectUser)
	const currentTable = useAppSelector(selectCurrentTable)

	const handleInputChange = (val: string) => {
		setIsEmailValid(true)
		setEmail(val);
		setInputLabel("Invitee email");
	}

	const handleAddMember = async () => {
		const isValid = validateEmail(email)
		if (!isValid) return
		try {
			await axios.post(`${API_URL}/invitations/create`, {
				inviteeEmail: email,
				inviterId: currentUser._id,
				tableId: currentTable._id,
				tableName: currentTable.title,
			},
				{
					withCredentials: true,
				})
			setInputLabel("User invited successfully!")
		} catch (err: any) {
			setIsEmailValid(false)
			setInvalidEmailMessage(err.response.data.message)
		}
	}

	const validateEmail = (
		email: string,
	) => {
		//email validation
		if (
			!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
			email.length < 5 ||
			email.length > 100
		) {
			setInvalidEmailMessage("Invalid email");
			setIsEmailValid(false);
			return false
		}
		if (email.length < 1) {
			setInvalidEmailMessage("Email field can't be empty");
			setIsEmailValid(false);
			return false
		}
		return true
	};

	return (
		<>
			<View>
				<TouchableOpacity
					className="flex flex-row gap-1 items-center"
					onPress={() => setIsAddMemberModalOpen(true)}
				>
					<Ionicons name="person-add" size={16} color={theme.colors.text}></Ionicons>
					<Text style={{color: theme.colors.text}}>Add member</Text>
				</TouchableOpacity>
			</View>
			<ReactNativeModal
				isVisible={isAddMemberModalOpen}
				onBackdropPress={() => setIsAddMemberModalOpen(false)}
				onModalHide={() => setInputLabel("Invitee email")}
				animationIn={"fadeInRightBig"}
			>
				<View className="p-8 rounded-lg">
					<Input onChangeText={handleInputChange} containerStyle={{ paddingHorizontal: 0 }}
						label={InputLabel} errorMessage={!isEmailValid ? invalidEmailMessage : ""} style={{ color: theme.colors.text }}
					></Input>
					<View className="w-full flex flex-row justify-center">
						<View className="w-24">
							<Button
								color={Colors.deepPurple.background}
								titleStyle={{ color: Colors.deepPurple.text }}
								onPress={handleAddMember}
							>Invite</Button>
						</View>
					</View>
				</View>
			</ReactNativeModal>
		</>
	)
}

export default EditTableAddMember