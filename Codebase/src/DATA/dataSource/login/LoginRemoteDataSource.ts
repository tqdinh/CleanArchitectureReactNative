import EntityLogin from "domain/entities/EntityLogin";
import { LoginDataSource } from "./LoginDataSource";
import { authActions } from "redux/auth/authSlice";

interface LoginRemoteInterface {
    Login(entityLogin: EntityLogin): any
}
export class LoginRemoteDataSource extends LoginDataSource implements LoginRemoteInterface {
    Login(entityLogin: EntityLogin) {
        if (entityLogin.is_valid_username()) {
            const username = entityLogin.getUsername()
            const password = entityLogin.getPassword()
            this.dispatch(authActions.login({ username, password }))
        }
    }

    Logout() {
        this.dispatch(authActions.logout())
    }
    ResetQuerryStatus() {
        this.dispatch(authActions.RESET_STATUS())
    }




}