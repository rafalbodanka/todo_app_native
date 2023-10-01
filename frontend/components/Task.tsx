import React, { useState } from "react";
import { StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { Text, View } from "./Themed";
import { ColumnType, TaskType } from "../types/Types";
import { useAppDispatch } from "../redux/hooks";
import { changeTaskStatus } from "../redux/currentTable";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Link, router, useNavigation } from "expo-router";

export default function Task({
  task, column, taskArray }:
  {task: TaskType; column: ColumnType, taskArray: string;}) {
    const dispatch = useAppDispatch()
    const handleChangeTaskStatus = () => {
      dispatch(changeTaskStatus({
        columnId: column._id,
        taskArray, taskId:
        task._id, newStatus:
        !task.completed
      }))
    }

  return (
	<TouchableHighlight onPress={() => {router.push({ pathname: `/edit-task/${task._id}` });}}>
		<View className="relative flex border-white border-2 rounded-md">
				<View className="w-64">
					<View className="flex flex-row items-start">
						<View className="flex justify-start h-full">
							<BouncyCheckbox
								size={24}
								fillColor="purple"
								unfillColor="#FFFFFF"
								text="Custom Checkbox"
								innerIconStyle={{ borderWidth: 2 }}
								isChecked={task.completed}
								onPress={handleChangeTaskStatus}
								textComponent={<></>}
								className="p-4"
								/>
						</View>
							<Text className={`p-3 pl-0 w-48 text-lg ${task.completed ? 'line-through text-gray-400' : 'no-underline'}`}
								>{task.title}</Text>
					</View>
				</View>
				<View className="absolute w-2 bg-green-400 h-full right-0 top-0"/>
		</View>
	</TouchableHighlight>
  );
}
