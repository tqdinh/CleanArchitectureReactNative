import { useNavigation } from "@react-navigation/native"
import { PhotoLocalDataSource } from "DATA/dataSource/photo/PhotoLocalDataSource"
import { PhotoRepositoryImpl } from "DATA/repository/photo/photoRepository"
import EntityPhoto from "DOMAIN/entities/EntityPhoto"
import { PhotoUsecaseImpl } from "DOMAIN/usecases/photo/PhotoUsecase"
import { useEffect, useState } from "react"
import { AppState, AppStateStatus } from "react-native"
import { Camera, PhotoFile } from "react-native-vision-camera"

const CameraViewModel = () => {
  const navigation = useNavigation()

  const photoLocalDataSource = new PhotoLocalDataSource()
  const photoRepository = new PhotoRepositoryImpl(photoLocalDataSource)
  const photoUsecase = new PhotoUsecaseImpl(photoRepository)

  const useIsForeground = (): boolean => {
    const [isForeground, setIsForeground] = useState(true)
    useEffect(() => {
      const onChange = (state: AppStateStatus): void => {
        setIsForeground(state === "active")
      }
      const listener = AppState.addEventListener("change", onChange)
      return () => listener.remove()
    }, [setIsForeground])
    return isForeground
  }

  const requestCameraPermissions = async () => {
    const cameraPermission = await Camera.requestCameraPermission()
    if (cameraPermission === "denied") {
      console.log("Camera permission is denied!")
      return
    }
    const microPermission = await Camera.requestMicrophonePermission()
    if (microPermission === "denied") {
      console.log("Micro permission is denied!")
      return
    }
    return
  }

  const saveNewPhoto = (photo: PhotoFile) => {
    const entityPhoto = new EntityPhoto(
      1, // mock checkpoint_id
      photo.path, // photo_url
      photo.path, // photo_name
      [0, 0], // mock coordinates
      Date.now() // Date
    )

    photoUsecase.saveNewPhoto(entityPhoto)
  }

  const takePhoto = async (cameraRef: React.RefObject<Camera>) => {
    if (cameraRef.current === null) {
      console.log("cameraRef is null!")
      return
    }
    const photo = await cameraRef.current.takePhoto()
    saveNewPhoto(photo)
  }

  const goBackToPreviousScreen = () => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    }
  }

  return {
    takePhoto,
    requestCameraPermissions,
    useIsForeground,
    goBackToPreviousScreen,
  }
}
export const useCameraViewModel = CameraViewModel
