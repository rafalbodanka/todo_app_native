import { useEffect, useState } from "react";
import axios from "axios"
import { selectUser, setUserData } from "../../redux/user";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Filters, User } from "../../types/Types";
import { selectTables, setTables } from "../../redux/tables";
import { selectCurrentTable, setColumns, setCurrentTable } from "../../redux/currentTable";

const useFetchTables = () => {

    const user: User = useAppSelector(selectUser);
    const dispatch = useAppDispatch()
    const tables = useAppSelector(selectTables)
    const currentTable = useAppSelector(selectCurrentTable)
    const [isFetching, setIsFetching] = useState(true)
  
    const [filters, setFilters] = useState<Filters>({
      isEstimated: [], // ["", "true", "false"]
      difficulty: [], // ["easy", "medium", "hard"]
      assignment: [], // ["user._id"]
      finishStatus: [], // ["exceeded", "today", "in-progress", "planned"]
    });
  
    const [searchValue, setSearchValue] = useState("");

    const API_URL = process.env.EXPO_PUBLIC_API_URL
  
    const getUserSet = async () => {
        if (!user.email) return;
      setIsFetching(true)
      try {
        const response = await axios.get(`${API_URL}/tables/tables`, {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          dispatch(setTables(response.data));
          let newColumns;
          if (currentTable._id != "") {
            const table = response.data.find(
              (table: any) => table._id === currentTable
            );
            if (table) {
              newColumns = table.columns;
            }
          } else {
            dispatch(setCurrentTable(response.data[0]));
            newColumns = response.data[0].columns;
          }
          if (newColumns) {
            dispatch(setColumns(newColumns));
          }
        }
      } catch (err) {} finally {
        setIsFetching(false)
      }
    };
  
    useEffect(() => {
      getUserSet();
    }, [user]);
}

export default useFetchTables;