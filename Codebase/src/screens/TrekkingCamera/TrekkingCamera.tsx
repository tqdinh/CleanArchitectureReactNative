import {
  Dimensions,
  TouchableOpacity,
  View,
} from "react-native"
import { useCameraViewModel } from "./TrekkingCameraViewModel"
import {
  Camera,
} from "react-native-vision-camera"
import { cameraStyle } from "./style"

const TrekkingCamera = () => {
  const height = Dimensions.get("window").height
  const {
    cameraRef,
    device,
    isActive,
    hasMicrophonePermission,
    onInitialized,
    onError,
    requestCameraPermissions,
    takePhoto 
  } = useCameraViewModel()

  return (
    <View style={cameraStyle.container}>
      {device != null && (
        <>
          <Camera
            ref={cameraRef}
            style={{ height: height * 0.8 }}
            device={device}
            isActive={isActive}
            onInitialized={onInitialized}
            onError={onError}
            enableZoomGesture={false}
            photo={true}
            audio={hasMicrophonePermission}
            orientation="portrait"
          />

          <TouchableOpacity
            style={cameraStyle.captureButton}
            onPress={takePhoto}
          />
        </>
      )}
    </View>
  )
}

export default TrekkingCamera
