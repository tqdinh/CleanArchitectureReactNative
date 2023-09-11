import { useNavigation } from "@react-navigation/native";
import { PhotoLocalDataSource } from "DATA/dataSource/photo/PhotoLocalDataSource";
import { PhotoRepositoryImpl } from "DATA/repository/photo/photoRepository";
import EntityPhoto from "DOMAIN/entities/EntityPhoto";
import { PhotoUsecaseImpl } from "DOMAIN/usecases/photo/PhotoUsecase";
import { useEffect, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import GetLocation, { Location } from "react-native-get-location";
import { Camera, PhotoFile } from "react-native-vision-camera";
import RNFS from "react-native-fs";
import { CheckpointLocalDataSource } from "DATA/dataSource/checkpoint/CheckpointLocalDataSource";
import { CheckpointRepositoryImpl } from "DATA/repository/checkpoint/CheckpointRepository";
import { CheckpointUsecaseImpl } from "DOMAIN/usecases/checkpoint/CheckpointUsecase";
import { useTrekkingMapViewModel } from "screens/TrekkingMap/TrekkingMapViewModel";
import EntityCheckpoint from "DOMAIN/entities/EntityCheckpoint";
import Toast from 'react-native-simple-toast';

const CameraViewModel = () => {
  const navigation = useNavigation();

  const photoLocalDataSource = new PhotoLocalDataSource();
  const photoRepository = new PhotoRepositoryImpl(photoLocalDataSource);
  const photoUsecase = new PhotoUsecaseImpl(photoRepository);

  const checkpointLocalDataSource = new CheckpointLocalDataSource();
  const checkpointRepository = new CheckpointRepositoryImpl(
    checkpointLocalDataSource
  );
  const checkpointUsecase = new CheckpointUsecaseImpl(checkpointRepository);

  const { journeyUsecase } = useTrekkingMapViewModel();

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
      });
      return newLocation;
    } catch (error) {
      console.log({ error });
      return null;
    }
  };

  const useIsForeground = (): boolean => {
    const [isForeground, setIsForeground] = useState(true);
    useEffect(() => {
      const onChange = (state: AppStateStatus): void => {
        setIsForeground(state === "active");
      };
      const listener = AppState.addEventListener("change", onChange);
      return () => listener.remove();
    }, [setIsForeground]);
    return isForeground;
  };

  const requestCameraPermissions = async () => {
    const cameraPermission = await Camera.requestCameraPermission();
    if (cameraPermission === "denied") {
      console.log("Camera permission is denied!");
      return;
    }
    const microPermission = await Camera.requestMicrophonePermission();
    if (microPermission === "denied") {
      console.log("Micro permission is denied!");
      return;
    }
    return;
  };

  const movePhoto = async (photo: PhotoFile) => {
    const pathSegments = photo.path.split("/");
    const fileName = pathSegments[pathSegments.length - 1];
    const newPhotoUrl = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    await RNFS.moveFile(photo.path, newPhotoUrl);
    return `file://${newPhotoUrl}`;
  };

  const takePhoto = async (cameraRef: React.RefObject<Camera>) => {
    if (cameraRef.current === null) {
      console.log("cameraRef is null!");
      return;
    }
    const photo = await cameraRef.current.takePhoto();
    const currentLocation = await getCurrentLocation();
    const photoPath = await movePhoto(photo);

    CreateNewCheckpointWithPhotoInCurrentJourney(photoPath, currentLocation);

    Toast.show('New photo is taken!', Toast.SHORT);
  };

  const goBackToPreviousScreen = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const CreateNewCheckpointWithPhotoInCurrentJourney = (
    photoPath: string,
    location: Location | null
  ) => {
    const currentJourney = journeyUsecase.GetCurrentJourney();
    if (currentJourney === undefined) {
      throw new Error("Error, Journey is undefined!");
    }
    const newEntityCheckpoint = new EntityCheckpoint();
    const newEntityPhoto = new EntityPhoto(photoPath);
    checkpointUsecase.CreateNewCheckpointWithPhotoInCurrentJourney(
      newEntityCheckpoint,
      newEntityPhoto,
      currentJourney
    );
  };

  return {
    takePhoto,
    requestCameraPermissions,
    useIsForeground,
    goBackToPreviousScreen,
  };
};
export const useCameraViewModel = CameraViewModel;
