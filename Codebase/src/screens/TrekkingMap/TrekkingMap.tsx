import { Text, TouchableOpacity, View } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import MapboxGL, { UserLocationRenderMode } from "@rnmapbox/maps"
import { trekkingMapStyle } from "./style"
import PhotoCarousel, { PhotoCarouselItem } from "./components/PhotoCarousel"
import { testingPhotos } from "./components/testingPhotos"
import { useFocusEffect } from "@react-navigation/native"
import { useTrekkingMapViewModel } from "./TrekkingMapViewModel"
import { JourneyStatus } from "../../models/JourneyModel"
import { MaterialCommunityIcons, MaterialIcons } from "themes/appIcon"
MapboxGL.setAccessToken(
  "pk.eyJ1IjoidHFkaW5oaGNtdXMiLCJhIjoiY2xsNG5teDZzMDZkcDNmb2dpcnljbGpzbyJ9.FIQMCyKAxOnFiYZCZ9wsHQ"
)

// TODO: useHook https://github.com/realm/FindOurDevices/blob/main/app/hooks/useLocation.js

const TrekkingMap = () => {
  const [isPause, setIsPause] = useState(true)
  const [shownRecordsCarousel, setShownRecordsCarousel] = useState(false)
  const [followUserLocation, setFollowUserLocation] = useState(true)
  // const journeyStarted = useAppSelector((state: TrekkingState) => state.journeyStarted)
  const [journeyStarted, setJourneyStarted] = useState(false)
  const [journeyPhotos, setJourneyPhotos] = useState<PhotoCarouselItem[]>([])

  const {
    goToTrekkingCamera,
    startNewJourney,
    finishJourney,
    getSavedJourneyStatusInLocalStorage,
    GetAllPhotosFromCurrentJourney,
  } = useTrekkingMapViewModel()

  useFocusEffect(
    useCallback(() => {
      requestAndroidLocationPermissions()
      setJourneyStarted(
        getSavedJourneyStatusInLocalStorage() === JourneyStatus.STARTED
      )
    }, [])
  )

  useEffect(()=> {
    if (shownRecordsCarousel) {
      setJourneyPhotos(GetAllPhotosFromCurrentJourney())
    }
    console.log(journeyPhotos)
  }, [shownRecordsCarousel])

  const requestAndroidLocationPermissions = async () => {
    await MapboxGL.requestAndroidLocationPermissions()
  }

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
                setFollowUserLocation(false)
              }
            }}
          />
          <MapboxGL.UserLocation
            visible={true}
            renderMode={UserLocationRenderMode.Native}
            showsUserHeadingIndicator={true}
            androidRenderMode={"normal"}
          />
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
            <MaterialIcons name={"flip-to-back"} size={30} />
          </TouchableOpacity>
        </View>
      )}

      {journeyStarted && !shownRecordsCarousel && (
        <View style={trekkingMapStyle.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              setIsPause(!isPause)
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
                goToTrekkingCamera()
              } else {
                setShownRecordsCarousel(true)
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
              setIsPause(!isPause)
              setJourneyStarted(false)
              finishJourney()
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
              setJourneyStarted(true)
              startNewJourney()
            }}
            style={[trekkingMapStyle.button]}
          >
            <Text style={trekkingMapStyle.text}>{"Start"}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default TrekkingMap
