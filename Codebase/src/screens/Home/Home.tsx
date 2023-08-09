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

        <Text> {JSON.stringify(authUser, null, 1)}</Text>

    </>)
}
export default Home