import React, { useState } from "react";
import { StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import Colors from "../constants/Colors";
import { ExternalLink } from "./ExternalLink";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";

export default function Task() {
		const [taskTitle, setTaskTitle] = useState("")
    const [isChecked, setIsChecked] = useState(false)
  return (
    <View className="relative flex-max-w-8/12 w-8/12 border-white border-2 rounded-md">
			<View className="p-4">
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
						/>
						<Text className={`pl-4 text-lg ${isChecked ? 'no-underline' : 'line-through text-gray-400'}`}
							>Task title</Text>
				</View>
			</View>
			<View className="absolute w-4 bg-green-400 h-full right-0 top-0"/>
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
