import { useTheme } from "@react-navigation/native";
import { Member } from "../../types/Types";
import { View, Text } from "../Themed";
import EditTableAddMember from "./EditTableAddMember";
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native";
import axios from "axios";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentTable } from "../../redux/currentTable";
import { selectUser } from "../../redux/user";

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

    const handleDeleteMember = async (userId: string) => {
        try {
            const response = await axios.post(`${API_URL}/tables/${tableId}/remove-member`, 
            {
                memberId: userId,
            })
            setTableMembers(response.data.data)
            console.log(response.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <View>
            <View className="flex flex-row justify-between">
                <Text className="font-bold text-[16px]">Table members</Text>
                <EditTableAddMember />
            </View>
            {tableMembers?.map(member => {
                return (
                    <View key={member.user._id}>
                        <Text>{currentUser._id===member.user._id && <Text className="font-bold">(You)</Text>} {member.user.firstName} {member.user.lastName} {member.user.email} {member.permission} {member.user.level}</Text>
                        {currentUser._id !== member.user._id && currentUserPermission === 'admin'
                        &&
                        <TouchableOpacity onPress={() => handleDeleteMember(member.user._id)}>
                            <Ionicons name="person-remove" size={16} color={theme.colors.text}></Ionicons>
                        </TouchableOpacity>
                        }
                    </View>
                )
            })}
        </View>
    )

}

export default TableMembers;