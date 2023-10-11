import { CheckBox } from "@rneui/themed"
import Colors from "../../constants/Colors"
import { TaskType } from "../../types/Types";
import { View, Text } from "../Themed";
import { useTheme } from "@react-navigation/native";

const EditTaskIsCompleted: React.FC<{
    task: TaskType;
    setTask: React.Dispatch<React.SetStateAction<TaskType | undefined>>;
  }> = ({ task, setTask }) => {

    const theme = useTheme()

    const changeIsCompleted = (val: boolean) => {
        setTask({...task, completed: val})
    }

    return (
        <View className="flex flex-row items-center">
            <Text>Completed</Text>
            <CheckBox checked={task.completed || false}
            checkedColor={Colors.deepPurple.background}
            uncheckedColor={Colors.deepPurple.background}
            containerStyle={{backgroundColor: theme.colors.background}}
            onPress={() => changeIsCompleted(!task.completed)}
            ></CheckBox>
        </View>
    )
}

export default EditTaskIsCompleted