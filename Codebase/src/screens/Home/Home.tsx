import { Text } from "react-native"
import { useHomeViewModel } from "./HomeViewModel"
import { useDispatch } from "react-redux"

const Home = () => {
    const dispatch = useDispatch()
    const {
        loadHome
    } = useHomeViewModel()
    return (<>
        <Text>---------------------</Text>
    </>)
}
export default Home