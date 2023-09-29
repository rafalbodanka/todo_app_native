import React, { useState } from "react";
import { StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { Text, View } from "./Themed";
import { TaskType } from "../types/Types";

export default function Task({ task }: {task: TaskType}) {
		const [taskTitle, setTaskTitle] = useState(task.title)
    const [isChecked, setIsChecked] = useState(false)
  return (
    <View className="relative flex border-white border-2 rounded-md">
			<View className="w-64">
				<View className="flex flex-row items-center">
					<BouncyCheckbox
						size={25}
						fillColor="purple"
						unfillColor="#FFFFFF"
						text="Custom Checkbox"
						innerIconStyle={{ borderWidth: 2 }}
						isChecked={isChecked}
						onPress={(isChecked: boolean) => {setIsChecked(!isChecked)}}
						textComponent={<></>}
            className="p-4 pr-2"
						/>
						<Text className={`pl-2 text-lg ${task.completed ? 'line-through text-gray-400' : 'no-underline'}`}
							>{taskTitle}</Text>
				</View>
			</View>
			<View className="absolute w-2 bg-green-400 h-full right-0 top-0"/>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
});
