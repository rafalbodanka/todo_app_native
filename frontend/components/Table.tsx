import React, { useRef, useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView, ActivityIndicator } from "react-native";
import { View } from "./Themed";
import Column from "./column/Column";
import useFetchTables from "./hooks/useFetchTables";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import currentTable, { selectCurrentTable } from "../redux/currentTable";
import { Header, Text } from "@rneui/themed";
import { Link } from "expo-router";
import { useTheme } from "@react-navigation/native";
import Colors from "../constants/Colors";
import TableHeader from "./table/TableHeader";
import Loader from "./Loader";
import AddColumn from "./table/AddColumn";
import { selectTables } from "../redux/tables";
import AddTable from "./table/AddTable";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { Dimensions, TouchableOpacity } from "react-native";
import { selectCurretColumnIndex, setCurrentColumnIndex } from "../redux/currentColumn";
import { ColumnType } from "../types/Types";
import Carousel from "react-native-reanimated-carousel";

export default function Table() {
	const width = Dimensions.get('window').width;
	const currentTable = useAppSelector(selectCurrentTable)
	const [isFetching, setIsFetching] = useState(true)
	const theme = useTheme()
	const tables = useAppSelector(selectTables)
	useFetchTables(setIsFetching)
	const dispatch = useAppDispatch()
	const scrollRef = useRef<ScrollView | null>(null);
	
	const handleScroll = (x: number, y: number) => {
		console.log('elo')
		scrollRef.current?.scrollTo({animated: true, x: x, y: y})
	}

	return (
		<>
			{!isFetching ?
				<>
					<Header
						backgroundColor={theme.colors.card}
						statusBarProps={{ backgroundColor: Colors.deepPurple.background, barStyle: "default" }}
						containerStyle={{
							marginTop: 4, shadowColor: "black", shadowRadius: 2,
						}}
						rightComponent={
							<Link className="px-4 py-1 pt-2" href="/navigation">
								<Icon name="user" size={24} style={{ color: theme.colors.text }} />
							</Link>
						}
						centerComponent={
							<TableHeader />
						}
						leftComponent={
							<AddTable isInHeader={true}/>
						}
					>
					</Header>
					{tables.length > 0 ?
					<ScrollView
						ref={scrollRef}
						horizontal
					>
						<View className={'flex flex-col'}>
							<View className={'flex flex-row'}>
								<Carousel
								data={currentTable.columns}
								loop={false}
								width={width}
								scrollAnimationDuration={1000}
								renderItem={({index}) => (
									<ScrollView key={index} showsVerticalScrollIndicator={false}
									>
										<Column column={currentTable.columns[index]}></Column>
									</ScrollView>
								)}
								/>
								<AddColumn />
							</View>
						</View>
					</ScrollView>
					:
					<AddTable isInHeader={false}/>
					}
				</>
				:
				<Loader/>
			}
		</>
	);
}
