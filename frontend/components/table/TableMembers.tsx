import { Member } from "../../types/Types";
import { View, Text } from "../Themed";
import EditTableAddMember from "./EditTableAddMember";

const TableMembers = ({tableMembers}: {tableMembers: Member[]}) => {

    return (
        <View>
            <View className="flex flex-row justify-between">
                <Text className="font-bold text-[16px]">Table members</Text>
                <EditTableAddMember />
            </View>
            {tableMembers?.map(member => {
                return (
                    <View key={member.user._id}>
                        <Text>{member.user.firstName}</Text>
                    </View>
                )
            })}
        </View>
    )

}

export default TableMembers;