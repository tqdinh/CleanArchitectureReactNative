import { useEffect, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import { Camera, Frame } from "react-native-vision-camera";
declare let _WORKLET: true | undefined;
const CameraViewModel = () => {
  const requestCameraPermissions = async () => {
    const cameraPermission = await Camera.requestCameraPermission();
    const microPermission = await Camera.requestMicrophonePermission()
  }


  const useIsForeground = (): boolean => {
    const [isForeground, setIsForeground] = useState(true);
    useEffect(() => {
      const onChange = (state: AppStateStatus): void => {
        setIsForeground(state === 'active');
      };
      const listener = AppState.addEventListener('change', onChange);
      return () => listener.remove();
    }, [setIsForeground]);
    return isForeground;
  };



  return {
    requestCameraPermissions,
    useIsForeground,
  }
}
export const useCameraViewModel = CameraViewModel
