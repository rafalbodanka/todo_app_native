import { useEffect, useState, useRef } from "react";
import { TaskType } from "../../types/Types";
import CalendarPicker from 'react-native-calendar-picker';
import { TouchableHighlight, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { View, Text } from "../Themed";
import { Icon } from "@rneui/themed";
import { useTheme } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import moment, { Moment } from "moment"
import { TouchableOpacity } from "react-native";

const EditTaskCalendarPicker: React.FC<{
  task: TaskType;
  setTask: React.Dispatch<React.SetStateAction<TaskType | undefined>>;
}> = ({ task, setTask }) => {

  const theme = useTheme()
  const pickerRef = useRef(null)
  const [isCalendarVisible, setIsCalendarVisible] = useState(false)
  
    const [startDate, setStartDate] = useState<string>(new Date().toISOString())
    const [endDate, setEndDate] = useState<string | null>(new Date().toISOString())

  const handleChangeCalendarVisibility = () => {
    setIsCalendarVisible(prev => !prev)
  }

  useEffect(() => {
    setStartDate(task.startDate)
    setEndDate(task.endDate)
  }, [])

  const onDateChange = (date: Moment, type: string) => {
    if (type === 'START_DATE') {
      setStartDate(date.toISOString())
    } else {
      if (date === null) {
        setEndDate(date)
      } else {
        setEndDate(date.toISOString())
      }
    }
  }

  useEffect(() => {
    startDate && endDate === null && setTask({...task, startDate: startDate})
    if (endDate !== null && endDate) {
      setTask({...task, startDate: startDate, endDate: endDate})
    }
  }, [startDate, endDate])

  return (
    <View>
      <TouchableWithoutFeedback
        onPress={handleChangeCalendarVisibility}
        className="my-4">
          <View>
            <Text>Start date: {new Date(task.startDate).toLocaleDateString()}</Text>
            <View className="flex flex-row items-center">
              <Text
              className={`${!task.completed && endDate && new Date(endDate) < new Date() && "color-red-600"}`}>
                End date: {
              endDate === null ? "Pick end date"
              :
              task.endDate && new Date(task.endDate).toLocaleDateString()
              }</Text>
              {!task.completed && endDate && new Date(endDate).setHours(0,0,0,0) < new Date().setHours(0,0,0,0) && <Text className="color-red-600 ml-2">Exceeded!</Text>}
            </View>
            <View className="flex flex-row items-center mt-2">
              <Text>Expand calendar</Text>
              <Icon
                size={16}
                color={theme.colors.text}
                name={isCalendarVisible ?
                'keyboard-arrow-down'
                :
                'keyboard-arrow-up'}>
              </Icon>
            </View>
          </View>
      </TouchableWithoutFeedback>
      {isCalendarVisible &&
        <View className="mt-2 mb-8">
          <CalendarPicker allowRangeSelection
          startFromMonday
          ref={pickerRef}
          initialDate={new Date(startDate)}
          allowBackwardRangeSelect
          selectedStartDate={new Date(startDate)}
          selectedEndDate={endDate !== null ? new Date(endDate) : undefined}
          selectedDayColor={Colors.deepPurple.background}
          selectedDayTextColor={Colors.deepPurple.text}
          onDateChange={onDateChange}
          ></CalendarPicker>
        </View>
      }
    </View>
  )
}

export default EditTaskCalendarPicker