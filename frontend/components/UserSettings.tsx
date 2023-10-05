import { useState } from "react"
import { Button, Image, Input, Text } from "@rneui/themed"
import { useAppSelector } from "../redux/hooks"
import { selectUser } from "../redux/user"
import { View } from "./Themed"
import { useTheme } from "@react-navigation/native"
import Colors from "../constants/Colors"
const UserSettings = () => {

    const user = useAppSelector(selectUser)
    const [isChanged, setIsChanged] = useState(false)
    const theme = useTheme()
    //https://www.react-hook-form.com/ -- native
    return (
        <View className="w-full h-full flex justify-center items-center">
            <View className="w-3/5">
                <Input label="First name" defaultValue={user.firstName} style={{color: theme.colors.text}}></Input>
                <Input label="Last name" defaultValue={user.lastName} style={{color: theme.colors.text}}></Input>
                <Input label="Level" defaultValue={user.level} style={{color: theme.colors.text}}></Input>
                <Input label="Email" defaultValue={user.email} style={{color: theme.colors.text}}></Input>
                <Button title="Save changes" color={Colors.deepPurple.background}
                disabled={!isChanged}></Button>
            </View>
        </View>
    )
}

export default UserSettings