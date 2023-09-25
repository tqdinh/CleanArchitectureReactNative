import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import MapboxGL, { UserLocationRenderMode } from "@rnmapbox/maps";
import { trekkingMapStyle } from "./style";
import PhotoCarousel, { PhotoCarouselItem } from "./components/PhotoCarousel";
import { testingPhotos } from "./components/testingPhotos";
import { useFocusEffect } from "@react-navigation/native";
import { useTrekkingMapViewModel } from "./TrekkingMapViewModel";
import { JourneyStatus } from "../../models/JourneyModel";
import { MaterialCommunityIcons, MaterialIcons } from "themes/appIcon";
import { RootState, useAppSelector } from "redux/store";
import { Position } from "geojson";
MapboxGL.setAccessToken(
  "pk.eyJ1IjoidHFkaW5oaGNtdXMiLCJhIjoiY2xsNG5teDZzMDZkcDNmb2dpcnljbGpzbyJ9.FIQMCyKAxOnFiYZCZ9wsHQ"
);

// TODO: useHook https://github.com/realm/FindOurDevices/blob/main/app/hooks/useLocation.js
type MarkerConfig = {
  coords: Position;
  color: string;
};
const TrekkingMap = () => {
  const [isPause, setIsPause] = useState(true);
  const [shownRecordsCarousel, setShownRecordsCarousel] = useState(false);
  const [followUserLocation, setFollowUserLocation] = useState(true);
  // const journeyStarted = useAppSelector((state: TrekkingState) => state.journeyStarted)
  const [journeyPhotos, setJourneyPhotos] = useState<PhotoCarouselItem[]>([]);

  const currentJourney = useAppSelector(
    (state: RootState) => state.trekking.currentJourney
  );

  const journeyStarted = currentJourney?.status === JourneyStatus.STARTED;

  const {
    goToTrekkingCamera,
    startNewJourney,
    finishJourney,
    GetAllPhotosFromCurrentJourney,
  } = useTrekkingMapViewModel();

  useFocusEffect(
    useCallback(() => {
      requestAndroidLocationPermissions();
    }, [])
  );

  useEffect(() => {
    if (shownRecordsCarousel) {
      setJourneyPhotos(GetAllPhotosFromCurrentJourney());
    }
    console.log(journeyPhotos);
  }, [shownRecordsCarousel]);

  const requestAndroidLocationPermissions = async () => {
    await MapboxGL.requestAndroidLocationPermissions();
  };

  const [selectedIndex, setSelectedIndex] = useState<number | undefined>();
  const [anchor, setAnchor] = useState({ x: 0.5, y: 0.5 });
  const [allowOverlap, setAllowOverlap] = useState(true);
  const centerCoord = [-73.99155, 40.72];

  const allColors = ["red", "green", "blue", "purple"];
  const [show, setShow] = useState(true);
  const [size, setSize] = useState(1);

  const [markers, setMarkers] = useState<MarkerConfig[]>([]);
  const randomizeCoordinatesAndColors = useCallback(() => {
    const newMarkers = new Array(20).fill(0).map((o, i) => {
      return {
        coords: [
          centerCoord[0] + (Math.random() - 0.5) * 0.008,
          centerCoord[1] + (Math.random() - 0.5) * 0.008,
        ],
        color: allColors[i % allColors.length],
      };
    });

    setMarkers(newMarkers);
  }, []);

  return (
    <View style={trekkingMapStyle.container}>
      <View style={trekkingMapStyle.mapContainer}>
        <MapboxGL.MapView
          style={trekkingMapStyle.map}
          tintColor={"red"}
          logoEnabled={false}
        >
          <MapboxGL.Camera
            followUserLocation={followUserLocation}
            followZoomLevel={18}
            onUserTrackingModeChange={(event) => {
              if (!event.nativeEvent.payload.followUserLocation) {
                setFollowUserLocation(false);
              }
            }}
            defaultSettings={{ centerCoordinate: centerCoord, zoomLevel: 14 }}
            centerCoordinate={centerCoord}
            zoomLevel={14}
          />

          <MapboxGL.UserLocation
            visible={true}
            renderMode={UserLocationRenderMode.Native}
            showsUserHeadingIndicator={true}
            androidRenderMode={"normal"}
          />

          {markers.map((marker, i) => {
            return (
              <MapboxGL.MarkerView
                key={`MarkerView-${marker.coords.join("-")}`}
                coordinate={marker.coords}
                anchor={anchor}
                allowOverlap={allowOverlap}
                isSelected={i === selectedIndex}
                style={{ display: show ? "flex" : "none" }}
              >
                <TouchableOpacity
                  style={[
                    {
                      flex: 0,

                      borderWidth: 2,
                      borderColor: "white",
                    },
                    { backgroundColor: marker.color, padding: 4 * size },
                  ]}
                  onPress={() =>
                    setSelectedIndex((index) => (index === i ? -1 : i))
                  }
                >
                  <Text
                    style={{ color: "white", fontSize: 11, fontWeight: "bold" }}
                  >
                    Marker2 {i + 1}
                  </Text>

                  <Image
                    source={{
                      uri: "https://images.unsplash.com/photo-1607326957431-29d25d2b386f",
                    }}
                    style={{ width: 50, height: 50 }}
                  ></Image>
                </TouchableOpacity>
              </MapboxGL.MarkerView>
            );
          })}
        </MapboxGL.MapView>
        <View style={trekkingMapStyle.buttonCurrentPosition}>
          <TouchableOpacity
            onPress={() => setFollowUserLocation((prevState) => !prevState)}
          >
            <MaterialCommunityIcons
              name={
                followUserLocation
                  ? "map-marker-radius"
                  : "map-marker-radius-outline"
              }
              size={30}
              style={{ alignSelf: "center" }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {journeyStarted && shownRecordsCarousel && (
        <View style={trekkingMapStyle.carouselContainer}>
          <View style={trekkingMapStyle.carousel}>
            <PhotoCarousel data={journeyPhotos}></PhotoCarousel>
          </View>
          <TouchableOpacity
            style={trekkingMapStyle.carouselBackButton}
            onPress={() => setShownRecordsCarousel(false)}
          >
            <MaterialIcons name={"arrow-back"} size={30} />
          </TouchableOpacity>
        </View>
      )}

      {journeyStarted && !shownRecordsCarousel && (
        <View style={trekkingMapStyle.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              setIsPause(!isPause);
              randomizeCoordinatesAndColors();
            }}
            style={trekkingMapStyle.button}
          >
            <Text style={trekkingMapStyle.text}>
              {isPause ? "PAUSE" : "RESUME"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (isPause) {
                goToTrekkingCamera();
              } else {
                setShownRecordsCarousel(true);
              }
            }}
            style={[trekkingMapStyle.button, { backgroundColor: "#D4F1F4" }]}
          >
            <MaterialIcons
              name={isPause ? "add-a-photo" : "photo-library"}
              size={40}
              style={{ alignSelf: "center", color: "black" }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setIsPause(!isPause);
              finishJourney();
            }}
            disabled={isPause}
            style={[trekkingMapStyle.button, { opacity: isPause ? 0 : 1 }]}
          >
            <Text style={trekkingMapStyle.text}>{"Finish"}</Text>
          </TouchableOpacity>
        </View>
      )}

      {!journeyStarted && (
        <View style={trekkingMapStyle.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              startNewJourney();
            }}
            style={[trekkingMapStyle.button]}
          >
            <Text style={trekkingMapStyle.text}>{"Start"}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default TrekkingMap;
