import { useTheme } from "@react-navigation/native"
import { Text } from "../Themed"
import { Link, router } from "expo-router"
import { useAppSelector } from "../../redux/hooks"
import { selectCurrentTable } from "../../redux/currentTable"
import { TouchableOpacity } from "react-native-gesture-handler"

const TableHeader = () => {
    const theme = useTheme()
    const currentTable = useAppSelector(selectCurrentTable)

    const handleLongPress = () => {
        router.push({ pathname: `/edit-table/`, params: { tableId: currentTable._id } })
    }

    const handleOnClick = () => {
        router.push('/tables')
    }

    return (
        <TouchableOpacity className="px-2 py-1 flex pt-2" onLongPress={handleLongPress} onPress={handleOnClick}>
            <Text className="text-lg" style={{color: theme.colors.text, fontWeight: 'bold'}}>{currentTable?.title}
            </Text>
        </TouchableOpacity>
    )
}

export default TableHeader