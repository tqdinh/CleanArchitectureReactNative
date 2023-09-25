import { View, TouchableOpacity, SectionList } from "react-native";
import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "themes/appIcon";
import JourneyItem from "./components/JourneyItem";
import { useTrekkingMapViewModel } from "./TrekkingJourneyViewModel";
import { trekkingJourneyStyle } from "./styles";
import { useSelector } from "react-redux";
import { TrekkingState } from "redux/trekking/trekkingSlice";
import { useFocusEffect } from "@react-navigation/native";
import { RootState, useAppSelector } from "redux/store";
import { JourneyStatus } from "models/JourneyModel";

const TrekkingJourney = () => {
  const { getAllJourneys, addNewJourney, searchJourney, handleOnViewJourney } =
    useTrekkingMapViewModel();

  const allJourneys = useAppSelector(
    (state: RootState) => state.trekking.allJourneys
  );

  useFocusEffect(
    useCallback(() => {
      getAllJourneys();
    }, [])
  );

  return (
    <SafeAreaView style={trekkingJourneyStyle.container}>
      {/* header */}
      <View style={trekkingJourneyStyle.headerContainer}>
        <TouchableOpacity onPress={addNewJourney}>
          <MaterialIcons name={"add-circle-outline"} size={30} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <MaterialIcons name={"delete"} size={30} />
        </TouchableOpacity>

        <TouchableOpacity onPress={searchJourney}>
          <MaterialIcons name={"search"} size={30} />
        </TouchableOpacity>
      </View>

      {/* journey list */}
      <SectionList
        sections={[{ data: allJourneys }]}
        renderItem={({ item, section }) => {
          return (
            <JourneyItem
              imageUri={
                "https://images.unsplash.com/photo-1607326957431-29d25d2b386f"
              }
              totalSubcriber={item?.total_subcriber ?? 0}
              onViewAll={() => handleOnViewJourney(item)}
              createdAt={new Date(
                item?.createdAtTimestamp ?? ""
              ).toLocaleString()}
              status={item?.status ?? JourneyStatus.UNDEFINED}
            />
          );
        }}
      ></SectionList>
    </SafeAreaView>
  );
};

export default TrekkingJourney;
