import { Platform } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import IconFontisto from 'react-native-vector-icons/Fontisto'
import IconFeather from 'react-native-vector-icons/Feather'
const loadIcon = () => {
  if ('ios' == Platform.OS) {
    Ionicons.loadFont()
    AntDesign.loadFont()
    FontAwesome.loadFont()
    Entypo.loadFont()
    MaterialIcons.loadFont()
    MaterialCommunityIcons.loadFont()
    IconFontisto.loadFont()
    IconFeather.loadFont()
    Fontisto.loadFont()
  }
}

export {
  loadIcon,
  Ionicons,
  AntDesign,
  IconFeather,
  Feather,
  FontAwesome,
  Entypo,
  MaterialIcons,
  IconFontisto,
  MaterialCommunityIcons,
  Fontisto
}
