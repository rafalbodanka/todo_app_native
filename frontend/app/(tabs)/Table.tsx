import { FlatList, StyleSheet, View } from "react-native";
import Table from "../../components/Table";
import { ScrollView } from "react-native-gesture-handler";

export default function TabOneScreen() {
  return (
    <View>
      <ScrollView
      horizontal
      className="min-h-full"
      >
        <Table></Table>
      </ScrollView>
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
