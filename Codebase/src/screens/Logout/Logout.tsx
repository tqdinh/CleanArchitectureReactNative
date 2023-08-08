import { Button, Text, Touchable, TouchableOpacity } from "react-native"
import { useLogoutViewModel } from "./LogoutViewModel"
import { useDispatch } from "react-redux"

const Logout = () => {
    const dispatch = useDispatch()
    const {
        logout
    } = useLogoutViewModel()
    return (<>
        <TouchableOpacity onPress={() => {
            logout()
        }} style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
            <Text style={{ backgroundColor: "red", padding: 10 }}>Logout</Text>
        </TouchableOpacity>

    </>)
}
export default Logout