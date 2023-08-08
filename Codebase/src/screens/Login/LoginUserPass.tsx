//import liraries

import React, { useState } from 'react'
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native'
import { useLoginUserPassViewModel } from './LoginUserPassViewModel'
import loginUserPassStyle from './style/loginUserPassStyle'
import CustomTextInput from './components/customTextInput'
import CustomButton from './components/CustomButton'
import { Colors } from 'themes/colors'


// create a component
const LoginUserPass = () => {
  const {
    authUser,
    login,
    goToMain
  } = useLoginUserPassViewModel()
  const [username, setUsername] = useState<string>('dinh.truong.cus')
  const [password, setpassword] = useState<string>('ab1234cd')
  const [hidePassword, setHidePassword] = useState<boolean>(true)


  return (
    <ImageBackground
      source={require('../../assets/images/backgrounds/background.png')}

      resizeMode='cover'
      style={styles.backgroundContainer}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.imageLogoContainer}>
          <Image
            source={{}}
            resizeMode='contain'
          />
        </View>
        <View style={styles.formContainer}>
          <CustomTextInput
            title='Tài khoản'
            placeholder='Tài khoản'
            value={username}
            setValue={setUsername}
            secureTextEntry={false}
            keyboardType='default'
            type=''
            editable={true}
            onPressHidingPassword={() => { }}
            numberOfLines={1}
            multiLines={false}
            textAlignVertical='center'
          />
          <CustomTextInput
            title='Mật khẩu'
            placeholder='*********'
            value={password}
            setValue={setpassword}
            secureTextEntry={hidePassword}
            keyboardType='default'
            editable={true}
            numberOfLines={1}
            multiLines={false}
            textAlignVertical='center'
            type='password'
            onPressHidingPassword={() => setHidePassword(!hidePassword)}
          />
          <CustomButton
            onPress={() => {
              login(username, password)
            }}
            color={Colors.SystemPrimary}
            text='Đăng nhập'
            disabled={false}
            textColor={Colors.SystemWhite}
            top={15}
          />
          <CustomButton
            onPress={() => {
              goToMain()
            }}
            top={15}
            color={Colors.SystemWhite}
            textColor={Colors.SystemPrimary}
            text='Skip'
            disabled={false}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

// define your styles
const styles = StyleSheet.create({
  ...loginUserPassStyle
})

//make this component available to the app
export default LoginUserPass
