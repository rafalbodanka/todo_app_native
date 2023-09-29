import { useState, useEffect } from "react"
import { View } from "./Themed"
import { TouchableHighlight, Animated, Easing  } from "react-native"
import { Link } from "expo-router";

export default function AddTask() {

    const colorAnimation = new Animated.Value(0)

    const handleAddTaskPress = () => {
        Animated.timing(colorAnimation, {
          toValue: 1,
          duration: 25,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }).start(() => {
          setTimeout(() => {
            Animated.timing(colorAnimation, {
              toValue: 0,
              duration: 100,
              easing: Easing.out(Easing.ease),
              useNativeDriver: false,
            }).start();
          }, 25); 
        });
      };

    const colorInterpolation = colorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#F2F2F2', 'gray'], // Define your desired colors here
    });
  
    const textStyle = {
    color: colorInterpolation,
    fontSize: 18,
    };

    return (
        <View className="flex flex-col rounded-md pb-4">
			<View className="w-64">
				<View className="flex flex-row items-center">
					<TouchableHighlight onPress={handleAddTaskPress}>
            <Link href="/add-task">
              <View className="flex flex-row items-center gap-1"> 
                  <Animated.Text style={textStyle}>+ Add task </Animated.Text>
              </View>
            </Link>
          </TouchableHighlight>
				</View>
			</View>
    </View>
    )
}