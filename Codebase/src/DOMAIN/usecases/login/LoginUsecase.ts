import { LoginRepository } from "DATA/repository/login/LoginRepository"
import EntityAuthentication from "DOMAIN/entities/EntityAuthentication"
import EntityLogin from "DOMAIN/entities/EntityLogin"

export interface LoginUsecase {
  Login(entityLogin: EntityLogin): any
  SaveAuthentication(entityAuthentication: EntityAuthentication): any
}
export class LoginUsecaseImpl implements LoginUsecase {
  private repository: LoginRepository
  constructor(_repository: LoginRepository) {
    this.repository = _repository
  }
  Login(entityLogin: EntityLogin) {
    this.repository.Login(entityLogin)
  }
  SaveAuthentication(entityAuthentication: EntityAuthentication) {
    this.repository.SaveAuthentication(entityAuthentication)
  }

} 