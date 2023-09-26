import { StyleSheet } from "react-native";
import { useState } from "react";
import { Text, View } from "../../components/Themed";
import { TextInput } from 'react-native';

export default function TabTwoScreen() {
  const [login, setLogin] = useState("")
  return (
    <View style={styles.container}>
      <View>
        <Text>
          Login to your account
        </Text>
        <TextInput
        textContentType="username"
        className="h-8 border-2 border-white rounded-md pl-2 text-white"
        placeholder="username"></TextInput>
        <TextInput
        textContentType="password"
        secureTextEntry
        className="h-8 border-2 border-white rounded-md pl-2 text-white"
        placeholder="password"></TextInput>
      </View>
    </View>
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
