import { useNavigation } from "@react-navigation/native";
import { JourneyLocalDataSource } from "DATA/dataSource/journey/JourneyLocalDataSource";
import { JourneyRepositoryImpl } from "DATA/repository/journey/JourneyRepository";
import EntityJourney from "DOMAIN/entities/EntityJourney";
import { JourneyUsecaseImpl } from "DOMAIN/usecases/journey/JourneyUsecase";
import Toast from 'react-native-simple-toast';
import { fakeJourneys } from "test/journeyFakeDatas";

const TrekkingJourneyViewModel = () => {
  const navigation = useNavigation<any>();

  const journeyLocalDataSource = new JourneyLocalDataSource();
  const journeyUsecase = new JourneyUsecaseImpl(
    new JourneyRepositoryImpl(journeyLocalDataSource)
  );
  
  const getAllJourneys = () => {
    return journeyUsecase.GetAllJourneys()
  }

  const addNewJourney = () => {
    journeyUsecase.CreateNewJourney(new EntityJourney());
  };

  const searchJourney = () => {
    Toast.show('To Be Developed!', Toast.SHORT);
  };

  const navigateToTrekkingMapWithJourney = (item: any) => {
    navigation.navigate("TrekkingMap");
  }; 
  
  
  return {
    getAllJourneys,
    addNewJourney,
    searchJourney,
    navigateToTrekkingMapWithJourney
  }
}

export const useTrekkingMapViewModel = TrekkingJourneyViewModel