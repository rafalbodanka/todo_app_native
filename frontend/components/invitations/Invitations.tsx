import { Button } from "@rneui/themed"
import { useEffect, useState } from "react"
import { ScrollView } from "react-native-gesture-handler"
import { useAppSelector } from "../../redux/hooks"
import { selectUser } from "../../redux/user"
import axios from "axios"
import { router } from "expo-router"
import { View, Text } from "../Themed"
import { ActivityIndicator, TouchableOpacity } from "react-native"
import { Invitation } from "../../types/Types"
import Colors, { green, red } from "../../constants/Colors"
import Icon from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native"
import Loader from "../Loader"

const Invitations = () => {

	const userId = useAppSelector(selectUser)._id
	const [isLoading, setIsLoading] = useState(true)
	const API_URL = process.env.EXPO_PUBLIC_API_URL
	const [sentInvitations, setSentInvitations] = useState<Invitation[]>()
	const [receivedInvitations, setReceivedInvitations] = useState<Invitation[]>()
	const [isReceivedInvitationsOpen, setIsReceivedInvitationsOpen] = useState(true)
	const [isSentInvitationsOpen, setIsSentInvitationsOpen] = useState(true)
	const currentUserId = useAppSelector(selectUser)._id
	const theme = useTheme()

	// fetch invitations
	useEffect(() => {
		const getSentInvitations = async () => {
			try {
				const response = await axios.get(`${API_URL}/invitations/get/inviter`,
					{
						withCredentials: true,
					})
				setSentInvitations(response.data)
			} catch (err) {
				router.back()
			} finally {
				setIsLoading(false)
			}
		}

		const getReceivedInvitations = async () => {
			try {
				const response = await axios.get(`${API_URL}/invitations/get/invitee`,
					{
						withCredentials: true,
					})
				setReceivedInvitations(response.data)
			} catch (err) {
				router.back()
			} finally {
				setIsLoading(false)
			}
		}

		getSentInvitations()
		getReceivedInvitations()
	}, [])

	//accept invitation
	const handleAcceptInvitation = async (invitationId: string) => {
		try {
			const response = await axios.post(`${API_URL}/invitations/${invitationId}/accept`, 
			{
				userId: currentUserId
			})
			setReceivedInvitations(response.data.data)
		} catch (err) {
			console.log(err)
		}
	}
	//cancel/reject sent invitation
	const handleCancelInvitation = async (invitationId: string, type: "cancel" | "reject") => {
		try {
			const response = await axios.post(`${API_URL}/invitations/${invitationId}/cancel`, 
			{
				type: type,
			},
			{
				withCredentials: true,
			})
			console.log(response)
			if (type === 'cancel') {
				setSentInvitations(response.data.data)
			} else {
				setReceivedInvitations(response.data.data)
			}
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<>
			{!isLoading ?
				<ScrollView className="w-full min-h-full">
					<View>
						<TouchableOpacity
						disabled={receivedInvitations && receivedInvitations.length < 1}
						className="flex flex-row items-center bg-neutral-400 h-10 border-b-[1px]"
						style={{backgroundColor: (receivedInvitations && receivedInvitations.length >= 1) ? Colors.deepPurple.background : theme.colors.card}}
						onPress={() => setIsReceivedInvitationsOpen(prev => !prev)}
						>
							<Text className="pl-4 text-[16px] font-bold" style={{color: Colors.deepPurple.text}}>Received invitations ({receivedInvitations?.length || 0})</Text>
							<Icon
								size={18}
								color={theme.colors.text}
								name={isReceivedInvitationsOpen ?
								'keyboard-arrow-down'
								:
								'keyboard-arrow-up'}>
							</Icon>
						</TouchableOpacity>
						{isReceivedInvitationsOpen && receivedInvitations?.map(receivedInvitation => {
							return (
								<View key={receivedInvitation._id} className="w-full p-8 border-b-[1px]" style={{borderColor: theme.colors.text}}>
									<Text className="text-center">
									{
									`${receivedInvitation.inviterFirstName} ${receivedInvitation.inviterLastName} (${receivedInvitation.inviterEmail}) invited you to the table `
									}
										<Text className="font-bold">
											{receivedInvitation.tableName}
										</Text>
									</Text>
									<View className="w-full flex flex-row justify-center items-center gap-4">
										<View>
											<Button
											onPress={() => handleAcceptInvitation(receivedInvitation._id)}
											titleStyle={{fontSize: 12}}
											buttonStyle={{width: 64}}
											color={green}
											title={Colors.deepPurple.text}>Accept</Button>
										</View>
										<View>
											<Button
											onPress={() => handleCancelInvitation(receivedInvitation._id, 'reject')}
											titleStyle={{fontSize: 12}}
											buttonStyle={{width: 64}}
											color={red}
											title={Colors.deepPurple.text}>Reject</Button>
										</View>
									</View>
								</View>
							)
						})}
						<TouchableOpacity
						disabled={sentInvitations && sentInvitations.length < 1}
						className="flex flex-row items-center h-10 border-b-[1px]"
						style={{backgroundColor: (sentInvitations && sentInvitations.length >= 1) ? Colors.deepPurple.background : theme.colors.card}}
						onPress={() => setIsSentInvitationsOpen(prev => !prev)}
						>
							<Text className="pl-4 text-[16px] font-bold" style={{color: Colors.deepPurple.text}}>Sent invitations ({sentInvitations?.length})</Text>
							<Icon
								size={18}
								color={theme.colors.text}
								name={isSentInvitationsOpen ?
								'keyboard-arrow-down'
								:
								'keyboard-arrow-up'}>
							</Icon>
						</TouchableOpacity>
						{isSentInvitationsOpen && sentInvitations?.map(sentInvitation => {
							return (
								<View key={sentInvitation._id} className="w-full p-8 border-b-[1px]" style={{borderColor: theme.colors.text}}>
									<Text className="mb-4 text-center">
									{
									`You invited ${sentInvitation.inviteeEmail} to the table `
									}
										<Text className="font-bold">
											{sentInvitation.tableName}
										</Text>
									</Text>
									<View className="w-full flex flex-row justify-center items-center gap-4">
										<View>
											<Button
											onPress={() => handleCancelInvitation(sentInvitation._id, 'cancel')}
											titleStyle={{fontSize: 12}}
											buttonStyle={{width: 64}}
											color={red}
											title={Colors.deepPurple.text}>Cancel</Button>
										</View>
									</View>
								</View>
							)
						})}
					</View>
				</ScrollView>
				:
				<Loader/>
			}
		</>
	)
}

export default Invitations