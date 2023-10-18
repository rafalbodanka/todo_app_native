import { useState } from 'react';
import { View, Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from '@rneui/themed';
import SelectDropdown from 'react-native-select-dropdown'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectColumns, selectCurrentTable, setCurrentTable } from '../../redux/currentTable';
import { ColumnType } from '../../types/Types';
import { useTheme } from '@react-navigation/native';
import Colors from '../../constants/Colors';
import axios from 'axios';
import { router } from 'expo-router';

export default function AddTaskModal() {

    const [taskTitle, setTaskTitle] = useState("")
    const [selectedColumnId, setSelectedColumnId] = useState(0) 
    const columns = useAppSelector(selectColumns)
    const columnsTitles = columns.map(column => column.title)
    const currentTableId = useAppSelector(selectCurrentTable)._id
    const API_URL = process.env.EXPO_PUBLIC_API_URL
    const dispatch = useAppDispatch()

    const handleAddTask = async () => {
        try {
            const response = await axios.post(`${API_URL}/tasks/create`,
            {
                title: taskTitle,
                columnId: columns[selectedColumnId]._id,
                tableId: currentTableId,
            },
            {
                withCredentials: true,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                },
            })
            if (response.status === 201) {
                dispatch(setCurrentTable(response.data.data))
                router.back()
            }
        } catch (err) {
        }
    }

    const theme = useTheme()

    return (
        <SafeAreaView>
            <View className="flex justify-center items-center w-full">
                <View className="w-3/5">
                <SelectDropdown
                    rowStyle={{backgroundColor: theme.colors.background}}
                    rowTextStyle={{color: theme.colors.text}}
                    buttonStyle={{width: 'auto', backgroundColor: theme.colors.background}}
                    buttonTextStyle={{color: theme.colors.text}}
                    defaultButtonText={columnsTitles[0]}
                    data={columnsTitles}
                        onSelect={(_, index) => {
                            setSelectedColumnId(index)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                        }}
                    />
                    <Input placeholder='Title' inputStyle={{color: theme.colors.text}} onChangeText={(val) => setTaskTitle(val)}></Input>
                    <Button title={"Add task"} color={Colors.deepPurple.background} onPress={handleAddTask}></Button>
                </View>
            </View>
        </SafeAreaView>
    )
}