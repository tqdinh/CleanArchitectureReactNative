import { Text, TouchableOpacity, View } from "react-native"
import React, { useState } from "react"
import MapboxGL, { UserLocationRenderMode } from "@rnmapbox/maps"
import { trekkingMapStyle } from "./style"
import { Ionicons, MaterialCommunityIcons } from "themes/appIcon"
MapboxGL.setAccessToken(
  "pk.eyJ1IjoidHFkaW5oaGNtdXMiLCJhIjoiY2xsNG5teDZzMDZkcDNmb2dpcnljbGpzbyJ9.FIQMCyKAxOnFiYZCZ9wsHQ"
)

const TrekkingMap = () => {
  const [isPause, setIsPause] = useState(true)
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
          onPress={() => { }}
          style={[trekkingMapStyle.button, { backgroundColor: "#D4F1F4" }]}
        >
          <Ionicons
            name={"camera-outline"}
            size={40}
            style={{ alignSelf: "center" }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setIsPause(!isPause)
          }}
          style={[trekkingMapStyle.button, { opacity: isPause ? 0 : 1 }]}
        >
          <Text style={trekkingMapStyle.text}>{"Finish"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TrekkingMap
