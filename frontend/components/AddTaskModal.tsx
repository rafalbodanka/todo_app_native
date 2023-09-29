import { useState } from 'react';
import { View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from '@rneui/themed';

export default function AddTaskModal() {

    const [taskTitle, setTaskTitle] = useState("")

    const handleAddTask = () => {
        console.log(taskTitle)
    }

    return (
        <SafeAreaView>
            <View className="flex justify-center items-center w-full">
                <View className="w-3/5">
                    <Input placeholder='Title' inputStyle={{color: "white"}} onChangeText={(val) => setTaskTitle(val)}></Input>
                    <Button title={"Add task"} color={"#F2F2F2"} onPress={handleAddTask}></Button>
                </View>
            </View>
        </SafeAreaView>
    )
}