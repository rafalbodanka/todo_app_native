import React, { useEffect, useState } from "react";

import exampleData from "../exampleData"

import { StyleSheet } from "react-native";

import Colors from "../constants/Colors";
import { ExternalLink } from "./ExternalLink";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";
import Task from "./Task";
import { ColumnType } from "../types/Types";
export default function Column({ column }: {column: ColumnType}) {
  return (
    <View className="flex flex-col justify-center">
      <View className="flex flex-row justify-center">
        <Text className="font-bold text-xl">{column?.title}</Text>
      </View>
        <View className="flex flex-row justify-center pt-4 pb-16">
                <View className="flex">
                {column.pendingTasks.length > 0 && <Text>Pending tasks</Text>}
                    {column.pendingTasks.map((task) => {
                        return (
                            <View className="pt-4">
                                <Task task={task}></Task>
                            </View>
                        )
                    })}
                    {column.showCompletedTasks && <Text className="pt-8">Completed tasks</Text>}
                    {column.completedTasks.map((task) => {
                        return (
                            <View className="pt-4">
                                <Task task={task}></Task>
                            </View>
                        )
                    })}
                </View>
        </View>
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
