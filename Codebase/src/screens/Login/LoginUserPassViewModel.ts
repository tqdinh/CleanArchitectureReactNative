import { LoginLocalDataSource } from 'DATA/dataSource/login/LoginLocalDataSource'
import { LoginRemoteDataSource } from 'DATA/dataSource/login/LoginRemoteDataSource'
import { LoginRepositoryImpl } from 'DATA/repository/login/LoginRepository'
import EntityAuthentication from 'DOMAIN/entities/EntityAuthentication'
import { LoginUsecaseImpl } from 'DOMAIN/usecases/login/LoginUsecase'
import EntityLogin from 'DOMAIN/entities/EntityLogin'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { delay } from 'redux-saga/effects'
import { selectAuth } from 'redux/auth/authSlice'

const LoginUserPassViewModel = () => {
  const authUser = useSelector(selectAuth)

  const remoteLogin = new LoginRemoteDataSource()
  const localLogin = new LoginLocalDataSource()
  const loginUsecase = new LoginUsecaseImpl(new LoginRepositoryImpl(localLogin, remoteLogin))

  useEffect(() => {
    const authUserEntity = new EntityAuthentication(authUser.access, authUser.refresh, authUser.avatar)
    if (authUserEntity.is_valid()) {
      loginUsecase.SaveAuthentication(authUserEntity)
      delay(1000)
      loginUsecase.ResetQuerryStatus()
    }
    else {
      console.log('User is not authorized, Lets remove it from the local DB')
    }


  }, [authUser])

  const login = (user: string, pass: string) => {
    const loginEntity = new EntityLogin(user, pass)
    loginUsecase.Login(loginEntity)
  }
  return {
    authUser,
    login
  }
}

export const useLoginUserPassViewModel = LoginUserPassViewModel
