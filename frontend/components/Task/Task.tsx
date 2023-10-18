import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useTheme } from "@react-navigation/native";
import { Text, View } from "../Themed";
import { ColumnType, TaskType } from "../../types/Types";
import { useAppDispatch } from "../../redux/hooks";
import { changeTaskStatus } from "../../redux/currentTable";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Link, router, useNavigation } from "expo-router";

export default function Task({
	task, column, taskArray }:
	{ task: TaskType; column: ColumnType, taskArray: string }) {
	const theme = useTheme()
	const dispatch = useAppDispatch()
	const handleChangeTaskStatus = () => {
		dispatch(changeTaskStatus({
			columnId: column._id,
			taskArray, taskId:
				task._id, newStatus:
				!task.completed
		}))
	}
	// carouselRef?.scrollTo({animated: true, index: 2})
	const displayedDifficulty = task.difficulty <= 3 ?
		{ text: "Easy", color: "#8fb935" } :
		task.difficulty <= 7 ?
			{ text: "Medium", color: "#e09c3b" } :
			{ text: "Hard", color: "#e64747" }

  return (
	<TouchableHighlight onPress={() => {router.push({ pathname: `/edit-task/`, params: { taskId: task._id } })}}>
		<View className={`relative flex border-[1px] rounded-md p-1`} style={{ borderColor: theme.colors.text }}>
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
				{task.isEstimated &&
					<View className="absolute flex justify-center items-center right-2 top-0">
						<Text
						className={'text-xs font-bold'}
						style={{ color: displayedDifficulty.color }}
						>
							{displayedDifficulty.text}
							&nbsp;
							{task.difficulty}
						</Text>
					</View>
				}
		</View>
	</TouchableHighlight>
  );
}
