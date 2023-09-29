import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Table from "../components/Table";
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { TableType } from "../types/Types";
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setTables, selectTables } from "../redux/tables";
import currentTable, { selectCurrentTable, setCurrentTable } from "../redux/currentTable";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Auth from "../components/auth/Auth";
import useFetchUserData from "../components/hooks/useFetchUserData";
import { Header } from "@rneui/themed";
import { selectAuth } from "../redux/auth";

export default function index() {

    const currentTable = useAppSelector(selectCurrentTable)
    const isLoggedIn = useAppSelector(selectAuth)
    useFetchUserData()
    console.log(isLoggedIn)
    return (
        <Auth>
            {isLoggedIn &&
                <>
                <Header backgroundColor="#171717"
                rightComponent={
                <Link className="text-white pl-8 pr-4 py-2" href="/navigation">
                    <Icon name="user" size={24} color="#F2F2F2" />
                </Link>
                }
                centerComponent={
                    <Link className="text-white py-2" href="/tables">
                    <Text className="text-lg text-white text-bold">{currentTable?.title}
                    </Text>
                </Link>
                }
                >
                </Header>
                    <View>
                        <View>
                            <ScrollView
                            horizontal
                            >
                                <Table></Table>
                            </ScrollView>
                        </View>
                    </View>
                </>
            }
        </Auth>
    )
}