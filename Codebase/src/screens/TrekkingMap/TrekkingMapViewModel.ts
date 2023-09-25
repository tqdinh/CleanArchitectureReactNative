import { useNavigation } from "@react-navigation/native";
import { JourneyLocalDataSource } from "DATA/dataSource/journey/JourneyLocalDataSource";
import { LocalStorageLocalDataSource } from "DATA/dataSource/localStorage/LocalStorageLocalDataSource";
import { PhotoLocalDataSource } from "DATA/dataSource/photo/PhotoLocalDataSource";
import { JourneyRepositoryImpl } from "DATA/repository/journey/JourneyRepository";
import { LocalStorageRepositoryImpl } from "DATA/repository/localStorage/LocalStorageRepository";
import { PhotoRepositoryImpl } from "DATA/repository/photo/photoRepository";
import EntityJourney from "DOMAIN/entities/EntityJourney";
import EntityLocalStorage from "DOMAIN/entities/EntityLocalStorage";
import { JourneyUsecaseImpl } from "DOMAIN/usecases/journey/JourneyUsecase";
import { LocalStorageUsecaseImpl } from "DOMAIN/usecases/localStorage/LocalStorageUsecase";
import { PhotoUsecaseImpl } from "DOMAIN/usecases/photo/PhotoUsecase";
import { JourneyStatus } from "models/JourneyModel";
import { PhotoCarouselItem } from "./components/PhotoCarousel";
import Toast from "react-native-simple-toast";
import { RootState, useAppSelector } from "redux/store";

const TrekkingMapViewModel = () => {
  const navigation = useNavigation<any>();

  const currentJourney = useAppSelector(
    (state: RootState) => state.trekking.currentJourney
  );

  // journey
  const journeyLocalDataSource = new JourneyLocalDataSource();
  const journeyUsecase = new JourneyUsecaseImpl(
    new JourneyRepositoryImpl(journeyLocalDataSource)
  );
  // local storage
  const localStorageLocalDataSource = new LocalStorageLocalDataSource();
  const localStorageUsecase = new LocalStorageUsecaseImpl(
    new LocalStorageRepositoryImpl(localStorageLocalDataSource)
  );

  // photo
  const photoLocalDataSource = new PhotoLocalDataSource();
  const photoRepository = new PhotoRepositoryImpl(photoLocalDataSource);
  const photoUsecase = new PhotoUsecaseImpl(photoRepository);

  const goToTrekkingCamera = () => {
    navigation.navigate("TrekkingCamera");
  };

  const startNewJourney = () => {
    // TODO: Set current journey to start
    journeyUsecase.SetCurrentJourneyStatus(
      new EntityJourney(
        currentJourney?._id,
        currentJourney?.title,
        currentJourney?.image_header,
        currentJourney?.total_subcriber,
        new Date(currentJourney?.createdAtTimestamp ?? 0),
        JourneyStatus.STARTED
      )
    );
    Toast.show("Start New Journey, take a picture and enjoy!", Toast.SHORT);
  };

  const finishJourney = () => {
    journeyUsecase.FinishCurrentJourney();
    Toast.show("Finished Journey!", Toast.SHORT);
  };

  const getSavedJourneyStatusInLocalStorage = () => {
    console.log("getSavedJourneyStatusInLocalStorage");
    const currentJourneyEntity = journeyUsecase.GetCurrentJourney();
    console.log({ currentJourneyEntity });
    return currentJourneyEntity?.getStatus();
  };

  const GetAllPhotosFromCurrentJourney = (): PhotoCarouselItem[] => {
    const currentJourneyEntity = journeyUsecase.GetCurrentJourney();
    if (currentJourneyEntity === undefined) return [];
    const photos =
      photoUsecase.GetAllPhotosFromCurrentJourney(currentJourneyEntity);
    const photoCarouselItems: PhotoCarouselItem[] = [];
    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i];
      photoCarouselItems.push({
        id: i,
        uri: photo.getPhotoPath(),
        title: photo.getName(),
        description: photo.getDescription(),
        location: "", // fix me: change the location
      });
    }
    return photoCarouselItems;
  };

  const deleteSelectedPhoto = () => {};

  return {
    journeyUsecase,
    goToTrekkingCamera,
    startNewJourney,
    finishJourney,
    getSavedJourneyStatusInLocalStorage,
    GetAllPhotosFromCurrentJourney,
  };
};

export const useTrekkingMapViewModel = TrekkingMapViewModel;
