import EntityLogin from "domain/entities/EntityLogin";
import { LoginDataSource } from "./LoginDataSource";
import { useDispatch } from "react-redux";
import { authActions } from "redux/auth/authSlice";

export class LoginRemoteDataSource implements LoginDataSource {

    dispatch = useDispatch()
    Login(entityLogin: EntityLogin) {
        if (entityLogin.is_valid_username()) {
            const username = entityLogin.getUsername()
            const password = entityLogin.getPassword()
            this.dispatch(authActions.login({ username, password }))
        }
    }
}