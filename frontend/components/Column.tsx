import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import Task from "./Task";
import { ColumnType } from "../types/Types";
import AddTaskButton from "./AddTaskButton";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useAppDispatch } from "../redux/hooks";
import { toggleCompletedTasksVisibility } from "../redux/currentTable";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "@react-navigation/native";

export default function Column({ column }: {column: ColumnType}) {

  const dispatch = useAppDispatch()
  const theme = useTheme()

  const toggleCompletedTaskVisibility = () => {
    dispatch(toggleCompletedTasksVisibility(column._id))
  }

  return (
    <View className="flex flex-col justify-center pt-4 pb-24">
      <View className="flex flex-row justify-center">
        <Text className="text-xl">{column?.title}</Text>
      </View>
        <View className="flex flex-row justify-center pt-4 pb-16">
          <View className="flex">
          <AddTaskButton></AddTaskButton>
          {column.pendingTasks?.length > 0 && <Text>Pending tasks</Text>}
              {column.pendingTasks.map((task) => {
                  return (
                      <View key={task._id} className="pt-4">
                          <Task task={task} column={column} taskArray="pendingTasks"></Task>
                      </View>
                  )
              })}
              {column.completedTasks &&
              <View className="mt-8">
                <TouchableOpacity onPress={toggleCompletedTaskVisibility}>
                  <View className="flex flex-row items-center">
                    <Text className="pr-2">Completed tasks
                    </Text>
                      <Icon
                      size={16}
                      color={theme.colors.text}
                      name={column.showCompletedTasks ?
                      'keyboard-arrow-down'
                      :
                      'keyboard-arrow-up'}>
                      </Icon>
                  </View>
                </TouchableOpacity>
              </View>
              }
              {column.showCompletedTasks && column.completedTasks.map((task) => {
                  return (
                      <View key={task._id} className="pt-4">
                          <Task task={task} column={column} taskArray="completedTasks"></Task>
                      </View>
                  )
              })}
          </View>
        </View>
    </View>
  );
}
