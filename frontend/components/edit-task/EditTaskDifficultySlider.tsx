import { TaskType } from "../../types/Types"
import { View, Text } from "../Themed";
import { Slider } from "@rneui/themed";
import Colors from "../../constants/Colors";

const EditTaskDifficultySlider: React.FC<{
    task: TaskType;
    setTask: React.Dispatch<React.SetStateAction<TaskType | undefined>>;
  }> = ({ task, setTask }) => {

    const changeDifficulty = (val: number) => {
        setTask({...task, difficulty: val})
    }

    const displayedDifficulty = task.difficulty <= 3 ?
    {text: "Easy", color: "#8fb935"} :
    task.difficulty <= 7 ?
    {text: "Medium", color: "#e09c3b"} :
    {text: "Hard", color: "#e64747"}

    return (
        <View>
            <View className="flex flex-row">
                <Text>Difficilty: {task.difficulty}</Text>
                <Text className="ml-1 font-bold" style={{ color: displayedDifficulty.color }}>{displayedDifficulty.text}</Text>
            </View>
            <Slider minimumValue={1} maximumValue={10} step={1} value={task.difficulty}
            thumbTintColor={Colors.deepPurple.background} thumbStyle={{width: 30, height: 30}}
            onValueChange={val => changeDifficulty(val)}
            />
        </View>
    )
}

export default EditTaskDifficultySlider