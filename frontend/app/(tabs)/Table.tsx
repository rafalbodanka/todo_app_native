import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import Column from "../../components/Column";

export default function TabOneScreen() {
  const [inputValue, setInputValue] = useState("")
  return (
    <Column></Column>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
