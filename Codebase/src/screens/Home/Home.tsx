import { Button, Text, Touchable, TouchableOpacity } from "react-native"
import { useHomeViewModel } from "./HomeViewModel"
import { useDispatch } from "react-redux"

const Home = () => {
    const dispatch = useDispatch()
    const {
        authUser,
        loadHome,
        login
    } = useHomeViewModel()
    return (<>
        <TouchableOpacity onPress={() => {
            login("dinh.truong.cus", "ab1234cd")

        }} style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
            <Text style={{ backgroundColor: "red", padding: 10 }}>Login</Text>
        </TouchableOpacity>
        <Text> {JSON.stringify(authUser, null, 1)}</Text>

    </>)
}
export default Home