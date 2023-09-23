import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-simple-toast';
import { fakeJourneys } from "test/journeyFakeDatas";

const TrekkingJourneyViewModel = () => {
  const navigation = useNavigation<any>();
  
  const getAllJourneys = () => {
    return fakeJourneys
  }

  const addNewJourney = () => {
    console.log("add new journey");
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