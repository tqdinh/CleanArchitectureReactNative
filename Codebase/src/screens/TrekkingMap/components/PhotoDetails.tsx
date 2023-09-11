import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { photoDetailsStyle } from '../style/photoDetailsStyle'
import Toast from 'react-native-simple-toast';
// Should limit description

export interface PhotoDetailsProps {
  uri: string
  title: number
  description: string
  location?: string
}

const PhotoDetails: FC<PhotoDetailsProps> = ({ uri, title, description, location }) => {
  return (
    <View style={photoDetailsStyle.container}>
      <Image source={{ uri: uri }} style={photoDetailsStyle.photo} />
      
      <View style={photoDetailsStyle.informationContainer}>
        <Text style={photoDetailsStyle.title}>{title}</Text>
        <Text>{description}</Text>
        <View style={photoDetailsStyle.buttonContainer}>
          <TouchableOpacity style={photoDetailsStyle.button} onPress={() => {
            Toast.show('To Be Developed!', Toast.SHORT);
          }}>
            <Text style={photoDetailsStyle.text}>{'Direction'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={photoDetailsStyle.button}onPress={() => {
            Toast.show('To Be Developed!', Toast.SHORT);
          }}>
            <Text style={photoDetailsStyle.text}>{'Edit'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default PhotoDetails
