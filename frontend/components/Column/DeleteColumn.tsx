import { useState } from "react"
import { Text, View } from "../Themed"
import { Ionicons } from "@expo/vector-icons";
import Colors, { green, red } from "../../constants/Colors";
import ReactNativeModal from "react-native-modal";
import { Button } from "@rneui/base";
import { useTheme } from "@react-navigation/native";
import { ColumnType } from "../../types/Types";
import { TouchableOpacity } from "react-native";
import axios from "axios";
import { useAppDispatch } from "../../redux/hooks";
import { setCurrentTable } from "../../redux/currentTable";

const DeleteColumn = ({
    isDeleteModalVisible,
    setIsDeleteModalVisible,
    column,
    }:
    {
        isDeleteModalVisible: boolean,
        setIsDeleteModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
        column: ColumnType;
    }) => {

    const theme = useTheme()
    const dispatch = useAppDispatch()
    const API_URL = process.env.EXPO_PUBLIC_API_URL

    const handleDeleteColumn = async () => {
        try {
            const response = await axios.post(`${API_URL}/columns/delete/${column._id}`)
            setIsDeleteModalVisible(false)
            dispatch(setCurrentTable(response.data.data))
        } catch (err) {
        }
    }

    return (
        <ReactNativeModal
        isVisible={isDeleteModalVisible}
        onBackdropPress={() => setIsDeleteModalVisible(false)}
        animationIn={"fadeInRightBig"}
      >
        <View className="p-8 rounded-lg" style={{ backgroundColor: theme.colors.card }}>
            <Text className="text-center mb-4 font-bold">{column.title}</Text>
          <View className="w-full flex flex-row justify-center" style={{ backgroundColor: theme.colors.card }}>
            <View>
              <Button
                color={Colors.deepPurple.background}
                titleStyle={{ color: Colors.deepPurple.text }}
                onPress={handleDeleteColumn}
              >Delete column</Button>
            </View>
          </View>
          <View className="items-center" style={{ backgroundColor: theme.colors.card }}>
            <TouchableOpacity
              className="mt-4 p-2"
              onPress={() => setIsDeleteModalVisible(false)}>
              <Text style={{ color: theme.colors.text }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ReactNativeModal>
    )
}

export default DeleteColumn