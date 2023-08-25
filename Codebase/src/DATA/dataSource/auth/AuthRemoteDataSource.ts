import EntityLogin from "domain/entities/EntityLogin";
import { AuthDataSource } from "./AuthDataSource";
import { authActions } from "redux/auth/authSlice";
import { fromLoginEntityToLoginRequest } from "CONVERTER/converterAuth";

interface AuthRemoteInterface {
    Login(entityLogin: EntityLogin): any
}
export class AuthRemoteDataSource extends AuthDataSource implements AuthRemoteInterface {
    Login(entityLogin: EntityLogin) {
        if (entityLogin.is_valid_username()) {
            const loginpayload = fromLoginEntityToLoginRequest(entityLogin)
            this.dispatch(authActions.login(loginpayload))
        }
    }
    Logout() {
        this.dispatch(authActions.logout())
    }
    ResetQuerryStatus() {
        this.dispatch(authActions.RESET_STATUS())
    }
}