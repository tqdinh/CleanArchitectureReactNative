import { useNavigation } from "@react-navigation/native"
import { PhotoLocalDataSource } from "DATA/dataSource/photo/PhotoLocalDataSource"
import { PhotoRepositoryImpl } from "DATA/repository/photo/photoRepository"
import EntityPhoto from "DOMAIN/entities/EntityPhoto"
import { PhotoUsecaseImpl } from "DOMAIN/usecases/photo/PhotoUsecase"
import { useEffect, useState } from "react"
import { AppState, AppStateStatus, PermissionsAndroid } from "react-native"
import GetLocation, { Location } from "react-native-get-location"
import { Camera, PhotoFile } from "react-native-vision-camera"
import RNFS from "react-native-fs"
import { Platform } from "react-native"
import { CameraRoll } from "@react-native-camera-roll/camera-roll"

const CameraViewModel = () => {
  const navigation = useNavigation()

  const photoLocalDataSource = new PhotoLocalDataSource()
  const photoRepository = new PhotoRepositoryImpl(photoLocalDataSource)
  const photoUsecase = new PhotoUsecaseImpl(photoRepository)

  async function hasAndroidPermission() {
    const getCheckPermissionPromise = () => {
      if (parseInt(Platform.Version.toString(), 10) >= 33) {
        return Promise.all([
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          ),
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO
          ),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission
        )
      } else {
        return PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        )
      }
    }

    const hasPermission = await getCheckPermissionPromise()
    if (hasPermission) {
      return true
    }
    const getRequestPermissionPromise = () => {
      if (parseInt(Platform.Version.toString(), 10) >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          (statuses) =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED
        )
      } else {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        ).then((status) => status === PermissionsAndroid.RESULTS.GRANTED)
      }
    }

    return await getRequestPermissionPromise()
  }

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

  const saveToPhotoGallery = async (journey_id: number, photo: PhotoFile) => {
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      return
    }

    CameraRoll.save(photo.path, {
      type: "photo",
      album: journey_id.toString(),
    })
  }

  const saveNewPhoto = (photo: PhotoFile) => {
    if (photo === null) {
      console.log("Error: Photo is null, return!")
      return
    }
    // Save photo in Pictures Directory
    saveToPhotoGallery(1, photo)

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
