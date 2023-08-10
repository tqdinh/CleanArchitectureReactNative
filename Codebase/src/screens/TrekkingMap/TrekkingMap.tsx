import { Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Mapbox from '@rnmapbox/maps';
import { trekkingMapStyle } from './style';
import { Ionicons } from 'themes/appIcon'

Mapbox.setAccessToken('pk.eyJ1IjoidHFkaW5oaGNtdXMiLCJhIjoiY2xsNG5teDZzMDZkcDNmb2dpcnljbGpzbyJ9.FIQMCyKAxOnFiYZCZ9wsHQ');

const TrekkingMap = () => {

  const [isPause, setIsPause] = useState(true)

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <View style={trekkingMapStyle.container}>
        <Mapbox.MapView style={trekkingMapStyle.map} />
      </View>

      <View style={{ flexDirection: 'row', marginBottom: 30, justifyContent: 'space-around' }}>
        <TouchableOpacity onPress={() => { setIsPause(!isPause) }} style={trekkingMapStyle.button}>
          <Text style={trekkingMapStyle.text}>{isPause? 'PAUSE' : 'RESUME'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { }} style={[trekkingMapStyle.button, {backgroundColor: '#0000CD'}]}>
          <Ionicons name={'camera-outline'} size={20} style={{ alignSelf: 'center' }} />
        </TouchableOpacity>


        <TouchableOpacity onPress={() => { setIsPause(!isPause) }} style={[trekkingMapStyle.button, {opacity: isPause? 0 : 1}]}>
          <Text style={trekkingMapStyle.text}>{'Finish'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TrekkingMap
