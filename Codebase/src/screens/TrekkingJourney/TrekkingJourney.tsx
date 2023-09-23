import { View, TouchableOpacity, SectionList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "themes/appIcon";
import JourneyItem from "./components/JourneyItem";
import { useTrekkingMapViewModel } from "./TrekkingJourneyViewModel";
import { trekkingJourneyStyle } from "./styles";

const TrekkingJourney = () => {
  const {
    getAllJourneys,
    addNewJourney,
    searchJourney,
    navigateToTrekkingMapWithJourney,
  } = useTrekkingMapViewModel();

  return (
    <SafeAreaView style={trekkingJourneyStyle.container}>
      {/* header */}
      <View style={trekkingJourneyStyle.headerContainer}>
        <TouchableOpacity onPress={addNewJourney}>
          <MaterialIcons name={"add-circle-outline"} size={30} />
        </TouchableOpacity>

        <TouchableOpacity onPress={searchJourney}>
          <MaterialIcons name={"search"} size={30} />
        </TouchableOpacity>
      </View>

      {/* journey list */}
      <SectionList
        sections={[{ data: getAllJourneys() }]}
        renderItem={({ item, section }) => {
          return (
            <JourneyItem
              id={item.id}
              imageUri={item.uri}
              totalSubcriber={item.totalSubcriber}
              onViewAll={navigateToTrekkingMapWithJourney}
            />
          );
        }}
      ></SectionList>
    </SafeAreaView>
  );
};

export default TrekkingJourney;
