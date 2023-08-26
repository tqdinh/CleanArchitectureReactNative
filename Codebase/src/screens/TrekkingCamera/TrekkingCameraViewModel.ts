import { useNavigation } from "@react-navigation/native"
import { PhotoLocalDataSource } from "DATA/dataSource/photo/PhotoLocalDataSource"
import { PhotoRepositoryImpl } from "DATA/repository/photo/photoRepository"
import EntityPhoto from "DOMAIN/entities/EntityPhoto"
import { PhotoUsecaseImpl } from "DOMAIN/usecases/photo/PhotoUsecase"
import { useEffect, useState } from "react"
import { AppState, AppStateStatus } from "react-native"
import GetLocation, {
  Location,
} from "react-native-get-location"
import { Camera, PhotoFile } from "react-native-vision-camera"
import RNFS from 'react-native-fs'

const CameraViewModel = () => {
  const navigation = useNavigation()

  const photoLocalDataSource = new PhotoLocalDataSource()
  const photoRepository = new PhotoRepositoryImpl(photoLocalDataSource)
  const photoUsecase = new PhotoUsecaseImpl(photoRepository)

  const getCurrentLocation = async () => {
    try {
      const newLocation = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 30000,
        rationale: {
          title: "Location permission",
          message: "The app needs the permission to request your location.",
          buttonPositive: "Ok",
        },
      })
      return newLocation
    } catch (error) {
      console.log({ error })
      return null
    }
  }

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

  const movePhoto = async (photo: PhotoFile) => {
    const pathSegments = photo.path.split('/')
    const fileName = pathSegments[pathSegments.length - 1]
    const newPhotoUrl = `${RNFS.DocumentDirectoryPath}/${fileName}`
    await RNFS.moveFile(photo.path, newPhotoUrl)
    return `file://${newPhotoUrl}`
  }

  const saveNewPhoto = async (photo: PhotoFile) => {
    const photoUrl = await movePhoto(photo)
    const entityPhoto = new EntityPhoto(
      1, // mock checkpoint_id
      photoUrl, // photo_url
      photoUrl, // photo_name
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

    const currentLocation = await getCurrentLocation()
    console.log({ currentLocation })
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
