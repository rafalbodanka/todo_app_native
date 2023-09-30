import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import Task from "./Task";
import { ColumnType } from "../types/Types";
import AddTaskButton from "./AddTaskButton";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useAppDispatch } from "../redux/hooks";
import { toggleCompletedTasksVisibility } from "../redux/currentTable";
import { TouchableHighlight } from "react-native-gesture-handler";

export default function Column({ column }: {column: ColumnType}) {

  const dispatch = useAppDispatch()

  const toggleCompletedTaskVisibility = () => {
    dispatch(toggleCompletedTasksVisibility(column._id))
  }

  return (
    <View className="flex flex-col justify-center pt-4 pb-24">
      <View className="flex flex-row justify-center">
        <Text className="font-bold text-xl">{column?.title}</Text>
      </View>
        <View className="flex flex-row justify-center pt-4 pb-16">
          <View className="flex">
          <AddTaskButton></AddTaskButton>
          {column.pendingTasks.length > 0 && <Text>Pending tasks</Text>}
              {column.pendingTasks.map((task) => {
                  return (
                      <View key={task._id} className="pt-4">
                          <Task task={task} column={column} taskArray="pendingTasks"></Task>
                      </View>
                  )
              })}
              {column.completedTasks &&
              <TouchableHighlight onPress={toggleCompletedTaskVisibility}>
                <View className="flex flex-row mt-8 items-center">
                  <Text className="pr-2">Completed tasks
                  </Text>
                    <Icon
                    size={16}
                    color={'#F2F2F2'}
                    name={column.showCompletedTasks ?
                    'keyboard-arrow-down'
                    :
                    'keyboard-arrow-up'}>
                    </Icon>
                </View>
              </TouchableHighlight>
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
