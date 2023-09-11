import { AuthRepository } from "DATA/repository/auth/AuthRepository"
import EntityAuthentication from "DOMAIN/entities/EntityAuthentication"
import EntityLogin from "DOMAIN/entities/EntityLogin"
import CommonUsecase from "../CommonUsecase"

export interface AuthUsecase extends CommonUsecase {
  Login(entityLogin: EntityLogin): any
  SaveAuthentication(entityAuthentication: EntityAuthentication): any
  Logout(): any
}

export class AuthUsecaseImpl implements AuthUsecase {
  private repository: AuthRepository
  constructor(_repository: AuthRepository) {
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