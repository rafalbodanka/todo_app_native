import React, { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView, ActivityIndicator } from "react-native";
import { View } from "./Themed";
import Column from "./column/Column";
import useFetchTables from "./hooks/useFetchTables";
import { useAppSelector } from "../redux/hooks";
import currentTable, { selectCurrentTable } from "../redux/currentTable";
import { Header } from "@rneui/themed";
import { Link } from "expo-router";
import { useTheme } from "@react-navigation/native";
import Colors from "../constants/Colors";
import TableHeader from "./table/TableHeader";
import Loader from "./Loader";
import AddColumn from "./table/AddColumn";
import { selectTables } from "../redux/tables";
import AddTable from "./table/AddTable";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Table() {
	const currentTable = useAppSelector(selectCurrentTable)
	const [isFetching, setIsFetching] = useState(true)
	const theme = useTheme()
	const tables = useAppSelector(selectTables)
	useFetchTables(setIsFetching)

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
					<GestureHandlerRootView className="flex-1">
						<ScrollView
							className="flex-1"
							horizontal
						>
							<View className={`flex flex-col flex-1 ${currentTable.columns.length > 0 && "pl-16"}`}>
								<View className={`flex flex-row flex-1 ${currentTable.columns.length > 0 && "gap-x-8"}`}>
									{currentTable?.columns.map(column => {
										return (
											<ScrollView key={column._id} showsVerticalScrollIndicator={false}
											>
												<Column column={column}></Column>
											</ScrollView>
										)
									})}
									<AddColumn />
								</View>
							</View>
						</ScrollView>
					</GestureHandlerRootView>
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