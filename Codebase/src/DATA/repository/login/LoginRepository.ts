import { LoginDataSource } from "DATA/dataSource/login/LoginDataSource"
import { LoginLocalDataSource } from "DATA/dataSource/login/LoginLocalDataSource"
import { LoginRemoteDataSource } from "DATA/dataSource/login/LoginRemoteDataSource"
import EntityAuthentication from "DOMAIN/entities/EntityAuthentication"
import EntityLogin from "domain/entities/EntityLogin"
import CommonRepository from "./CommonRepository"

export interface LoginRepository extends CommonRepository {
    Login(entityLogin: EntityLogin): any
    SaveAuthentication(entityAuthentication: EntityAuthentication): any
}
export class LoginRepositoryImpl implements LoginRepository {
    private localDataSource: LoginDataSource
    private remoteDataSource: LoginDataSource
    constructor(_localDataSource: LoginDataSource, _remoteDataSource: LoginDataSource) {
        this.localDataSource = _localDataSource
        this.remoteDataSource = _remoteDataSource
    }
    ResetQuerryStatus() {
        this.remoteDataSource.ResetQuerryStatus()
        this.localDataSource.ResetQuerryStatus()
    }
    SaveAuthentication(entityAuthentication: EntityAuthentication) {
        (this.localDataSource as LoginLocalDataSource).SaveAuthentication(entityAuthentication)
    }
    Login(entityLogin: EntityLogin) {
        (this.remoteDataSource as LoginRemoteDataSource).Login(entityLogin)
    }

}