import { StatusBar } from "expo-status-bar";
import { Button, Platform, StyleSheet, Touchable, TouchableHighlight } from "react-native";

import { Text, View } from "../components/Themed";
import { TableType } from "../types/Types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectTables } from "../redux/tables";
import { setCurrentTable } from "../redux/currentTable";
import { useNavigation } from '@react-navigation/native';
import useFetchTables from "../components/hooks/useFetchTables";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ModalScreen() {

  useFetchTables()

  const tables = useAppSelector(selectTables)
    const dispatch = useAppDispatch()
    const navigation = useNavigation()

    const setNewCurrentTable = (table: TableType) => {
        dispatch(setCurrentTable(table))
        navigation.goBack();
    }

    const closeModal = () => {
      navigation.goBack();
    }
  return (
    <View className="w-screen flex-1 flex-row justify-center">
      <View className="flex-1 flex-col">
        {tables.map(table => {
            return (
            <View key={table._id}>
                <View
                    style={styles.separator}
                    className=""
                    lightColor="#eee"
                    darkColor="rgba(255,255,255,0.1)"
                    />
                    <TouchableOpacity onPress={() => setNewCurrentTable(table)}>
                        <Text
                        style={styles.title}
                        className="text-center"
                        >{table.title}</Text>
                    </TouchableOpacity>
                </View>
            )
        })}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 30,
  },
  separator: {
    height: 2,
    width: "100%",
  },
});
