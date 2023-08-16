import { Dimensions, Text, TouchableOpacity, View } from "react-native"
import { useCameraViewModel } from "./TrekkingCameraViewModel"
import { Camera, useCameraDevices } from "react-native-vision-camera"
import { cameraStyle } from "./style"
import { useCallback, useEffect, useRef, useState } from "react"
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native"
import Arrow from "./components/Arrow"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

const TrekkingCamera = () => {
  const height = Dimensions.get("window").height
  const width = Dimensions.get("window").width
  const {
    requestCameraPermissions,
    takePhoto,
    useIsForeground,
    goBackToPreviousScreen,
  } = useCameraViewModel()
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

  const navigation = useNavigation()

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
          <View>
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
            <View style={cameraStyle.arrowContainer}>
              <Arrow height={height * 0.3} width={width * 0.3} color="red" />
            </View>
          </View>
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
      <TouchableOpacity
        style={{ position: "absolute", margin: 20 }}
        onPress={() => {
          goBackToPreviousScreen()
        }}
      >
        <MaterialIcons
          name={"arrow-back-ios"}
          size={40}
          style={{ alignSelf: "center", color: "black" }}
        />
      </TouchableOpacity>
    </View>
  )
}

export default TrekkingCamera
