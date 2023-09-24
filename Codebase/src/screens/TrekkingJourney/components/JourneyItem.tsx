import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { journeyItemStyle } from "../styles";

interface JourneyItemProps {
  id: string;
  imageUri: string;
  totalSubcriber: number;
  onViewAll?: (id: string, imageUri: string, totalSubcriber: number) => void;
  createdAt: string
}

const JourneyItem: FC<JourneyItemProps> = ({
  id,
  imageUri,
  totalSubcriber,
  onViewAll,
  createdAt
}) => {
  return (
    <View style={journeyItemStyle.container}>
      <View style={journeyItemStyle.detailContainer}>
        <Image source={{ uri: imageUri }} style={journeyItemStyle.image} />
        <View style={journeyItemStyle.subcriberContainer}>
          <Text>Total subcribers</Text>
          <Text style={journeyItemStyle.subcriberText}>{totalSubcriber}</Text>
          <Text>Created At</Text>
          <Text style={journeyItemStyle.subcriberText}>{createdAt}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={journeyItemStyle.viewAllButton}
        onPress={() => {
          if (onViewAll) {
            onViewAll(id, imageUri, totalSubcriber);
          }
        }}
      >
        <Text style={journeyItemStyle.viewAllText}>View all</Text>
      </TouchableOpacity>
    </View>
  );
};

export default JourneyItem;
