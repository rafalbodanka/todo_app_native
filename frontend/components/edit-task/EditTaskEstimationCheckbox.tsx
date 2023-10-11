import { CheckBox } from "@rneui/themed"
import Colors from "../../constants/Colors"
import { TaskType } from "../../types/Types";
import { View, Text } from "../Themed";
import { useTheme } from "@react-navigation/native";

const EditTaskEstimationCheckbox: React.FC<{
    task: TaskType;
    setTask: React.Dispatch<React.SetStateAction<TaskType | undefined>>;
  }> = ({ task, setTask }) => {

    const theme = useTheme()

    const changeIsEstimated = (val: boolean) => {
        setTask({...task, isEstimated: val})
    }

    return (
        <View className="flex flex-row items-center">
            <Text>Estimation</Text>
            <CheckBox checked={task.isEstimated || false}
            checkedColor={Colors.deepPurple.background}
            uncheckedColor={Colors.deepPurple.background}
            containerStyle={{backgroundColor: theme.colors.background}}
            onPress={() => changeIsEstimated(!task.isEstimated)}
            ></CheckBox>
        </View>
    )
}

export default EditTaskEstimationCheckbox