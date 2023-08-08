import { LoginRepository } from "DATA/repository/login/LoginRepository"
import EntityAuthentication from "DOMAIN/entities/EntityAuthentication"
import EntityLogin from "DOMAIN/entities/EntityLogin"
import CommonUsecase from "../CommonUsecase"

export interface LoginUsecase extends CommonUsecase {
  Login(entityLogin: EntityLogin): any
  SaveAuthentication(entityAuthentication: EntityAuthentication): any
  Logout(): any
}

export class LoginUsecaseImpl implements LoginUsecase {
  private repository: LoginRepository
  constructor(_repository: LoginRepository) {
    this.repository = _repository
  }
  Logout() {
    this.repository.Logout()
  }
  ResetQuerryStatus() {
    this.repository.ResetQuerryStatus()
  }
  Login(entityLogin: EntityLogin) {
    this.repository.Login(entityLogin)
  }
  SaveAuthentication(entityAuthentication: EntityAuthentication) {
    this.repository.SaveAuthentication(entityAuthentication)
  }

} 