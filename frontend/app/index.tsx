import Auth from "../components/auth/Auth";
import Table from "../components/Table";
import Unauth from "../components/Unauth";
import useFetchUserData from "../components/hooks/useFetchUserData";
import { useAppSelector } from "../redux/hooks";
import { selectAuth } from "../redux/auth";

export default function index() {

    const isLoggedIn = useAppSelector(selectAuth)
    useFetchUserData()

    return (
        <Auth>
            {isLoggedIn ?
            <Table></Table>
            :
            <Unauth></Unauth>
            }
        </Auth>
    )
}