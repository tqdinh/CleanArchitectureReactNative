import { Text, TouchableOpacity, View } from "react-native"
import React, { useState } from "react"
import MapboxGL, { UserLocationRenderMode } from "@rnmapbox/maps"
import { trekkingMapStyle } from "./style"
import { MaterialCommunityIcons, MaterialIcons } from "themes/appIcon"
import PhotoCarousel from "./components/PhotoCarousel"
import { testingPhotos } from "./components/testingPhotos"
MapboxGL.setAccessToken(
  "pk.eyJ1IjoidHFkaW5oaGNtdXMiLCJhIjoiY2xsNG5teDZzMDZkcDNmb2dpcnljbGpzbyJ9.FIQMCyKAxOnFiYZCZ9wsHQ"
)

const TrekkingMap = () => {
  const [isPause, setIsPause] = useState(true)
  const [shownRecordsCarousel, setShownRecordsCarousel] = useState(false)
  const [followUserLocation, setFollowUserLocation] = useState(true)

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

      {shownRecordsCarousel && (
        <View style={trekkingMapStyle.carouselContainer}>
          <View style={trekkingMapStyle.carousel}>
            <PhotoCarousel data={testingPhotos}></PhotoCarousel>
          </View>
          <TouchableOpacity
            style={trekkingMapStyle.carouselBackButton}
            onPress={() => setShownRecordsCarousel(false)}
          >
            <MaterialIcons name={"flip-to-back"} size={30} />
          </TouchableOpacity>
        </View>
      )}

      {!shownRecordsCarousel && (
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
                // TODO: Navigate to Camera Screen
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
            }}
            disabled={isPause}
            style={[trekkingMapStyle.button, { opacity: isPause ? 0 : 1 }]}
          >
            <Text style={trekkingMapStyle.text}>{"Finish"}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default TrekkingMap
