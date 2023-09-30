import { useState } from 'react';
import { View, Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from '@rneui/themed';
import SelectDropdown from 'react-native-select-dropdown'
import { useAppSelector } from '../redux/hooks';
import { selectColumns } from '../redux/currentTable';
import { ColumnType } from '../types/Types';

export default function AddTaskModal() {

    const [taskTitle, setTaskTitle] = useState("")
    const [selectedColumnId, setSelectedColumnId] = useState(0) 
    const columns = useAppSelector(selectColumns).map(column => column.title)

    const handleAddTask = () => {
        console.log(taskTitle)
    }

    return (
        <SafeAreaView>
            <View className="flex justify-center items-center w-full">
                <View className="w-3/5">
                <SelectDropdown
                    rowStyle={{backgroundColor: '#171717'}}
                    rowTextStyle={{color: "#F2F2F2"}}
                    buttonStyle={{width: 'auto', backgroundColor: 'black'}}
                    buttonTextStyle={{color: "#F2F2F2"}}
                    defaultButtonText={columns[0]}
                    data={columns}
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
                    <Input placeholder='Title' inputStyle={{color: "white"}} onChangeText={(val) => setTaskTitle(val)}></Input>
                    <Button title={"Add task"} color={"#311B92"} onPress={handleAddTask}></Button>
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    dropdownOverlayView: {
      backgroundColor: '#EFEFEF',
    },
    shadow: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 6},
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 10,
    },
  });
  