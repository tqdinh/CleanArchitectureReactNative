import EntityAuthentication from 'DOMAIN/entities/EntityAuthentication'

import EntityLogin from 'DOMAIN/entities/EntityLogin'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { delay } from 'redux-saga/effects'
import { selectAuth } from 'redux/auth/authSlice'
import { useNavigation } from '@react-navigation/native'
import { AuthLocalDataSource } from 'DATA/dataSource/auth/AuthLocalDataSource'
import { AuthRemoteDataSource } from 'DATA/dataSource/auth/AuthRemoteDataSource'
import { AuthRepositoryImpl } from 'DATA/repository/auth/AuthRepository'
import { AuthUsecaseImpl } from 'DOMAIN/usecases/auth/AuthUsecase'

const LoginUserPassViewModel = () => {
  const authUser = useSelector(selectAuth)
  const navigation = useNavigation<any>()
  const remoteLogin = new AuthRemoteDataSource()
  const localLogin = new AuthLocalDataSource()
  const loginUsecase = new AuthUsecaseImpl(new AuthRepositoryImpl(localLogin, remoteLogin))

  useEffect(() => {
    const authUserEntity = new EntityAuthentication(authUser.access, authUser.refresh, authUser.avatar)
    if (authUserEntity.is_valid()) {
      loginUsecase.SaveAuthentication(authUserEntity)
      delay(1000)
      loginUsecase.ResetQuerryStatus()
    }



  }, [authUser])

  const login = (user: string, pass: string) => {
    const loginEntity = new EntityLogin(user, pass)
    loginUsecase.Login(loginEntity)
  }
  const goToMain = () => {
    navigation.navigate("Main")
  }
  return {
    authUser,
    login,
    goToMain
  }
}

export const useLoginUserPassViewModel = LoginUserPassViewModel
