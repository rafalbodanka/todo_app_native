import { useState, useEffect } from "react"
import { View, Text } from "./Themed"
import { TouchableHighlight, Animated, Easing  } from "react-native"
import { Link } from "expo-router";

export default function AddTask() {
  
    return (
      <View className="flex flex-col border-y-[0.5px] border-[#F2F2F2] py-2 mb-4">
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