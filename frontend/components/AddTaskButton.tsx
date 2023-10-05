import { useState, useEffect } from "react"
import { View, Text } from "./Themed"
import { TouchableHighlight, Animated, Easing  } from "react-native"
import { Link } from "expo-router";
import { useTheme } from "@react-navigation/native";

export default function AddTask() {

  const theme = useTheme()

    return (
      <View className="flex flex-col border-b-[0.5px] py-2 mb-4" style={{borderColor: theme.colors.text}}>
			<View className="w-64">
				<View className="flex flex-row items-center">
					<TouchableHighlight>
            <Link href="/add-task">
              <View className="flex flex-row items-center gap-1">
                  <Text>+ Add task </Text>
              </View>
            </Link>
          </TouchableHighlight>
				</View>
			</View>
    </View>
    )
}