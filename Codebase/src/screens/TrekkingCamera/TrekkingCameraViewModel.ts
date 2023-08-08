import { useEffect, useState } from "react"
import { AppState, AppStateStatus } from "react-native"
import { Camera } from "react-native-vision-camera"

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

  const requestCameraPermissions = async () => {
    const cameraPermission = await Camera.requestCameraPermission()
    if (cameraPermission === 'denied') {
      console.log("Camera permission is denied!")
      return
    }
    const microPermission = await Camera.requestMicrophonePermission()
    if (microPermission === 'denied') {
      console.log("Micro permission is denied!")
      return
    }
    return
  }

  const takePhoto = async (cameraRef: any) => {
    if (cameraRef.current === null) {
      console.log("cameraRef is null!")
      return
    }
    const photo = await cameraRef.current.takePhoto()
    // TODO: handle save photo
    console.log({ photo })
  }

  return {
    takePhoto,
    requestCameraPermissions,
    useIsForeground
  }
}
export const useCameraViewModel = CameraViewModel
