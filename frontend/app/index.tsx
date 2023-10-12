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
import { Header, darkColors } from "@rneui/themed";
import { selectAuth } from "../redux/auth";
import Unauth from "../components/Unauth";
import { useTheme } from "@react-navigation/native";
import Colors from "../constants/Colors";

export default function index() {

    const theme = useTheme()
    const currentTable = useAppSelector(selectCurrentTable)
    const isLoggedIn = useAppSelector(selectAuth)
    useFetchUserData()

    return (
        <Auth>
            {isLoggedIn ?
                <>
                <Header
                backgroundColor={theme.colors.card}
                statusBarProps={{backgroundColor: Colors.deepPurple.background, barStyle: "default"}}
                containerStyle={{marginTop: 4, shadowColor: "black", shadowRadius: 2,
                }}
                rightComponent={
                <Link className="px-4 py-1 pt-2" href="/navigation">
                    <Icon name="user" size={24} style={{ color: theme.colors.text}} />
                </Link>
                }
                centerComponent={
                <Link className="px-2 py-1 flex pt-2" href="/tables">
                    <Text className="text-lg text-bold" style={{color: theme.colors.text}}>{currentTable?.title}
                    </Text>
                </Link>
                }
                >
                </Header>
                <ScrollView
                horizontal
                >
                    <Table></Table>
                </ScrollView>
                </>
            :
            <Unauth></Unauth>
            }
        </Auth>
    )
}