import React, { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView, ActivityIndicator } from "react-native";
import { View } from "./Themed";
import Column from "./column/Column";
import useFetchTables from "./hooks/useFetchTables";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentTable } from "../redux/currentTable";
import { Header } from "@rneui/themed";
import { Link } from "expo-router";
import { useTheme } from "@react-navigation/native";
import Colors from "../constants/Colors";
import TableHeader from "./table/TableHeader";
import Loader from "./Loader";

export default function Table() {
	const table = useAppSelector(selectCurrentTable)
	const [isFetching, setIsFetching] = useState(true)
	const theme = useTheme()

	useFetchTables(setIsFetching)
	console.log

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
					>
					</Header>
					<ScrollView
						horizontal
					>
						<View className="flex flex-col justify-center px-16">
							<View className="flex flex-row justify-center gap-8">
								{table?.columns.map(column => {
									return (
										<ScrollView key={column._id} showsVerticalScrollIndicator={false}
										>
											<Column column={column}></Column>
										</ScrollView>
									)
								})}
							</View>
						</View>
					</ScrollView>
				</>
				:
				<Loader/>
			}
		</>
	);
}