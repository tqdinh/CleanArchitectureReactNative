import { Text } from "react-native"
import { useDispatch } from "react-redux"
import { useCameraViewModel } from "./CameraViewModel"

const Camera = () => {
	const dispatch = useDispatch()
	const { loadCamera } = useCameraViewModel()

	return (<>
		<Text>-Camera View-</Text>
	</>)
}
export default Camera