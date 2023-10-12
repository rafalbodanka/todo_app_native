import React, { useEffect, useState } from "react";

import { ScrollView, StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import Column from "./Column/Column";
import useFetchTables from "./hooks/useFetchTables";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentTable } from "../redux/currentTable";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Table() {
  const table = useAppSelector(selectCurrentTable)

  useFetchTables()

  return (
      <View className="flex flex-col justify-center px-16">
          <View className="flex flex-row justify-center gap-8">
              {table?.columns.map(column => {
                  return (
                      <ScrollView key={column._id} showsVerticalScrollIndicator={false}
                      >
                          <Column column={column}></Column>
                      </ScrollView>
                  )
              })}
          </View>
      </View>
  );
}