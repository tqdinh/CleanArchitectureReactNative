import { Dimensions, Text, TouchableOpacity, View } from "react-native"
import { useCameraViewModel } from "./TrekkingCameraViewModel"
import {
  Camera,
  useCameraDevices,
} from "react-native-vision-camera"
import { cameraStyle } from "./style"
import { useCallback, useEffect, useRef, useState } from "react"
import { useFocusEffect, useIsFocused } from "@react-navigation/native"

const TrekkingCamera = () => {
  const height = Dimensions.get("window").height
  const { requestCameraPermissions, takePhoto, useIsForeground } =
    useCameraViewModel()
  const cameraRef = useRef<Camera>(null)
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState(false)
  const [isCameraInitiated, setIsCameraInitiated] = useState(false)
  // check if camera page is active
  const isFocussed = useIsFocused()
  const isForeground = useIsForeground()
  const isActive = isFocussed && isForeground
  // camera format settings
  const devices = useCameraDevices()
  const device = devices["back"]

  useFocusEffect(() => {
    Camera.getMicrophonePermissionStatus().then((status) =>
      setHasMicrophonePermission(status === "authorized")
    )
  })

  useEffect(() => {
    requestCameraPermissions()
  }, [])

  const onInitialized = useCallback(() => {
    console.log("Camera initialized!!")
    setIsCameraInitiated(true)
  }, [])

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
            enableZoomGesture={false}
            photo={true}
            audio={hasMicrophonePermission}
            orientation="portrait"
          />
          <View style={cameraStyle.buttonContainer}>
            <TouchableOpacity
              style={cameraStyle.button}
              onPress={() => takePhoto(cameraRef)}
              disabled={!(isCameraInitiated && isActive)}
            >
              <View style={cameraStyle.captureButton} />
              <View style={cameraStyle.captureButtonBorder} />
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
