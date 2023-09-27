import React, { useEffect, useState } from "react";

import exampleData from "../exampleData"

import { ScrollView, StyleSheet } from "react-native";

import Colors from "../constants/Colors";
import { ExternalLink } from "./ExternalLink";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";
import Task from "./Task";
import { TableType } from "../types/Types";
import Column from "./Column";

export default function Table() {
    const [table, setTable] = useState<TableType>()
    useEffect(() => {
        setTable(exampleData)
    }, [])
  return (
      <View className="flex flex-col justify-center px-16">
        <View className="flex flex-row justify-center">
          <Text className="font-bold text-xl">{table?.title}</Text>
        </View>
          <View className="flex flex-row justify-center gap-8">
              {table?.columns.map(column => {
                  return (
                      <ScrollView showsVerticalScrollIndicator={false}
                      >
                          <Column column={column}></Column>
                      </ScrollView>
                  )
              })}
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
