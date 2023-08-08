import { useIsFocused } from "@react-navigation/native"
import { useCallback, useEffect, useRef, useState } from "react"
import { AppState, AppStateStatus } from "react-native"
import { Camera, CameraRuntimeError, useCameraDevices } from "react-native-vision-camera"

const CameraViewModel = () => {
  const useIsForeground = (): boolean => {
    const [isForeground, setIsForeground] = useState(true)
    useEffect(() => {
      const onChange = (state: AppStateStatus): void => {
        setIsForeground(state === 'active')
      }
      const listener = AppState.addEventListener('change', onChange)
      return () => listener.remove()
    }, [setIsForeground])
    return isForeground
  }
  
  const cameraRef = useRef<Camera>(null)
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState(false)
  // check if camera page is active
  const isFocussed = useIsFocused()
  const isForeground = useIsForeground()
  const isActive = isFocussed && isForeground
  // camera format settings
  const devices = useCameraDevices()
  const device = devices["back"]

  const requestCameraPermissions = async () => {
    // TODO: make it more stable
    await Camera.requestCameraPermission()
    await Camera.requestMicrophonePermission()
  }

  const onError = useCallback((error: CameraRuntimeError) => {
    console.error(error)
  }, [])

  const onInitialized = useCallback(() => {
    console.log("Camera initialized!")
  }, [])

  useEffect(() => {
    Camera.getMicrophonePermissionStatus().then((status) =>
      setHasMicrophonePermission(status === "authorized")
    )
  }, [])

  const takePhoto = async () => {
    if (cameraRef.current === null) {
      console.log("cameraRef is null!")
      return
    }
    const photo = await cameraRef.current.takePhoto()
    // TODO: handle save photo
    console.log({ photo })
  }

  return {
    cameraRef,
    device,
    isActive,
    hasMicrophonePermission,
    requestCameraPermissions,
    onError,
    onInitialized,
    takePhoto,
  }
}
export const useCameraViewModel = CameraViewModel
