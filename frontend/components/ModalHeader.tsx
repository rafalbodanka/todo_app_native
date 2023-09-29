import { View, Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ModalHeader({ headerTitle }: { headerTitle: string}) {

	const navigation = useNavigation()
	const insets = useSafeAreaInsets();

	const handleClose = () => {
		navigation.goBack()
	}
	return (
			<View className="bg-neutral-900 relative flex flex-col items-center justify-center" style={{paddingTop: insets.top}}>	
				<View className="flex flex-col items-center justify-center">
					<Text className="text-white font-bold text-lg">{headerTitle}</Text>
				</View>
				<View className="absolute bottom-0 right-0 h-full">
					<TouchableHighlight
					className="h-full flex flex-col items-center justify-center pl-4 pr-4"
					onPress={handleClose}
					>
						<Ionicons name="close" size={24} color="#F2F2F2"></Ionicons>
					</TouchableHighlight>
				</View>
			</View>
	)
}

