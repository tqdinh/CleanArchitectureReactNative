import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { journeyItemStyle } from "../styles";

interface JourneyItemProps {
  imageUri: string;
  totalSubcriber: number;
  onViewAll?: () => void;
  createdAt: string;
  status: string;
}

const JourneyItem: FC<JourneyItemProps> = ({
  imageUri,
  totalSubcriber,
  onViewAll,
  createdAt,
  status,
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
          <Text>Status</Text>
          <Text style={journeyItemStyle.subcriberText}>{status}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={journeyItemStyle.viewAllButton}
        onPress={() => {
          if (onViewAll) {
            onViewAll();
          }
        }}
      >
        <Text style={journeyItemStyle.viewAllText}>View all</Text>
      </TouchableOpacity>
    </View>
  );
};

export default JourneyItem;
