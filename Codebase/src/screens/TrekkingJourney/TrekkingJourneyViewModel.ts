import { useNavigation } from "@react-navigation/native";
import { JourneyLocalDataSource } from "DATA/dataSource/journey/JourneyLocalDataSource";
import { JourneyRepositoryImpl } from "DATA/repository/journey/JourneyRepository";
import EntityJourney from "DOMAIN/entities/EntityJourney";
import { JourneyUsecaseImpl } from "DOMAIN/usecases/journey/JourneyUsecase";
import { JourneyModel } from "models/JourneyModel";
import Toast from "react-native-simple-toast";
import { fakeJourneys } from "test/journeyFakeDatas";

const TrekkingJourneyViewModel = () => {
  const navigation = useNavigation<any>();

  const journeyLocalDataSource = new JourneyLocalDataSource();
  const journeyUsecase = new JourneyUsecaseImpl(
    new JourneyRepositoryImpl(journeyLocalDataSource)
  );

  const getAllJourneys = () => {
    return journeyUsecase.GetAllJourneys();
  };

  const addNewJourney = () => {
    journeyUsecase.CreateNewJourney(new EntityJourney());
  };

  const searchJourney = () => {
    Toast.show("To Be Developed!", Toast.SHORT);
  };

  const navigateToTrekkingMap = () => {
    navigation.navigate("TrekkingMap");
  };

  const handleOnViewJourney = (item: JourneyModel) => {
    journeyUsecase.SetCurrentJourney(
      new EntityJourney(
        item?._id,
        item?.title,
        item?.image_header,
        item?.total_subcriber,
        new Date(item?.createdAtTimestamp ?? ""),
        item?.status
      )
    );

    navigateToTrekkingMap();
  };

  return {
    getAllJourneys,
    addNewJourney,
    searchJourney,
    handleOnViewJourney,
  };
};

export const useTrekkingMapViewModel = TrekkingJourneyViewModel;
