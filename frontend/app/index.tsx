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
import Unauth from "../components/Unauth";

export default function index() {

    const currentTable = useAppSelector(selectCurrentTable)
    const isLoggedIn = useAppSelector(selectAuth)
    useFetchUserData()

    return (
        <Auth>
            {isLoggedIn ?
                <>
                <Header backgroundColor="#171717"
                containerStyle={{marginTop: 4, backgroundColor: "black"}}
                barStyle="light-content"
                rightComponent={
                <Link className="text-white px-4 py-1 pt-2" href="/navigation">
                    <Icon name="user" size={24} color="#F2F2F2" />
                </Link>
                }
                centerComponent={
                    <Link className="text-white px-2 py-1 flex pt-2" href="/tables">
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
            :
            <Unauth></Unauth>
            }
        </Auth>
    )
}