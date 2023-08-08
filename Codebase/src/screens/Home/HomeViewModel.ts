import { LoginLocalDataSource } from "DATA/dataSource/login/LoginLocalDataSource"
import { LoginRemoteDataSource } from "DATA/dataSource/login/LoginRemoteDataSource"
import { LoginRepositoryImpl } from "DATA/repository/login/LoginRepository"
import EntityAuthentication from "DOMAIN/entities/EntityAuthentication"
import EntityLogin from "DOMAIN/entities/EntityLogin"
import { LoginUsecaseImpl } from "DOMAIN/usecases/login/LoginUsecase"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { delay } from "redux-saga/effects"
import { selectAuth } from "redux/auth/authSlice"


const HomeViewModel = () => {

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


  const loadHome = () => {

  }
  const login = (user: string, pass: string) => {
    const loginEntity = new EntityLogin(user, pass)
    loginUsecase.Login(loginEntity)
  }
  return {
    authUser,
    loadHome,
    login
  }
}
export const useHomeViewModel = HomeViewModel
