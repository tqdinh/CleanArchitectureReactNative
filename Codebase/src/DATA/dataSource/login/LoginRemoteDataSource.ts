import EntityLogin from "domain/entities/EntityLogin";
import { LoginDataSource } from "./LoginDataSource";
import { useDispatch } from "react-redux";
import { authActions } from "redux/auth/authSlice";
import CommonDataSource from "../CommonDataSource";

export class LoginRemoteDataSource extends LoginDataSource implements CommonDataSource {
    ResetQuerryStatus() {
        this.dispatch(authActions.RESET_STATUS())
    }

    dispatch = useDispatch()
    Login(entityLogin: EntityLogin) {
        if (entityLogin.is_valid_username()) {
            const username = entityLogin.getUsername()
            const password = entityLogin.getPassword()
            this.dispatch(authActions.login({ username, password }))
        }
    }
}