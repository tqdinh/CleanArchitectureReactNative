import { Image, Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { PhotoModel } from "models/PhotoModel";
import MapboxGL from "@rnmapbox/maps";
import { photoMapMarkerStyle } from "../style";

interface PhotoMapMarkerProps {
  index: number;
  photo: PhotoModel;
}

const PhotoMapMarker: FC<PhotoMapMarkerProps> = ({ index, photo }) => {
  return (
    <MapboxGL.MarkerView
      key={`MarkerView-${index}`}
      coordinate={[photo!.location!.longitude, photo!.location!.latitude]}
      anchor={{ x: 0.5, y: 0.5 }}
      allowOverlap={true}
    >
      <TouchableOpacity style={photoMapMarkerStyle.button}>
        <Text style={photoMapMarkerStyle.text}>Photo {index}</Text>
        <Image
          source={{
            uri: photo?.photo_path,
          }}
          style={photoMapMarkerStyle.photo}
        ></Image>
      </TouchableOpacity>
    </MapboxGL.MarkerView>
  );
};

export default PhotoMapMarker;
