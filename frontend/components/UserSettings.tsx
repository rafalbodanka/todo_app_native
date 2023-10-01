import { useState } from "react"
import { Button, Image, Input, Text } from "@rneui/themed"
import { useAppSelector } from "../redux/hooks"
import { selectUser } from "../redux/user"
import { View } from "./Themed"

const UserSettings = () => {

    const user = useAppSelector(selectUser)
    const [isChanged, setIsChanged] = useState(false)

    //https://www.react-hook-form.com/ -- native
    return (
        <View className="w-full h-full flex justify-center items-center">
            <View className="w-3/5">
                <Input label="First name" defaultValue={user.firstName} style={{color: "white"}}></Input>
                <Input label="Last name" defaultValue={user.lastName} style={{color: "white"}}></Input>
                <Input label="Level" defaultValue={user.level} style={{color: "white"}}></Input>
                <Input label="Email" defaultValue={user.email} style={{color: "white"}}></Input>
                <Button title="Save changes" color={"#311B92"}
                disabled={!isChanged}></Button>
            </View>
        </View>
    )
}

export default UserSettings