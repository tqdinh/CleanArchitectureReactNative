import { AuthDataSource } from "DATA/dataSource/auth/AuthDataSource"
import { AuthLocalDataSource } from "DATA/dataSource/auth/AuthLocalDataSource"
import { AuthRemoteDataSource } from "DATA/dataSource/auth/AuthRemoteDataSource"
import EntityAuthentication from "DOMAIN/entities/EntityAuthentication"
import EntityLogin from "domain/entities/EntityLogin"
import CommonRepository from "./CommonRepository"

export interface AuthRepository extends CommonRepository {
    Login(entityLogin: EntityLogin): any
    SaveAuthentication(entityAuthentication: EntityAuthentication): any
    Logout(): any
}
export class AuthRepositoryImpl implements AuthRepository {
    private localDataSource: AuthDataSource
    private remoteDataSource: AuthDataSource
    constructor(_localDataSource: AuthDataSource, _remoteDataSource: AuthDataSource) {
        this.localDataSource = _localDataSource
        this.remoteDataSource = _remoteDataSource
    }
    Logout() {
        this.remoteDataSource.Logout()
        this.localDataSource.Logout()
    }
    ResetQuerryStatus() {
        this.remoteDataSource.ResetQuerryStatus()
        this.localDataSource.ResetQuerryStatus()
    }
    SaveAuthentication(entityAuthentication: EntityAuthentication) {
        (this.localDataSource as AuthLocalDataSource).SaveAuthentication(entityAuthentication)
    }
    Login(entityLogin: EntityLogin) {
        (this.remoteDataSource as AuthRemoteDataSource).Login(entityLogin)
    }
}