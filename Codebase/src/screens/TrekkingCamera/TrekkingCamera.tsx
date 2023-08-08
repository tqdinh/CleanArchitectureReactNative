import {
  Dimensions,
  Text,
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
            style={{ height: height * 0.75 }}
            device={device}
            isActive={isActive}
            onInitialized={onInitialized}
            onError={onError}
            enableZoomGesture={false}
            photo={true}
            audio={hasMicrophonePermission}
            orientation="portrait"
          />
          <View style={cameraStyle.buttonContainer}>
            <TouchableOpacity
              style={cameraStyle.button}
              onPress={takePhoto}
            >
              <View style={cameraStyle.captureButton} />
              <View style={cameraStyle.captureButtonBorder}></View>
            </TouchableOpacity>
          </View>

          <View style={cameraStyle.textContainer}>
            <Text style={cameraStyle.text}>Camera</Text>
          </View>
        </>
      )}
    </View>
  )
}

export default TrekkingCamera
