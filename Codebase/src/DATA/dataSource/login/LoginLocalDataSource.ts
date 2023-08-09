import EntityAuthentication from "DOMAIN/entities/EntityAuthentication";
import { LoginDataSource } from "./LoginDataSource";

export class LoginLocalDataSource implements LoginDataSource {
    Logout(): void {
        console.log("clear local DB here")
    }
    ResetQuerryStatus() {

    }
    token: string = ""
    SaveAuthentication(entityAuthentication: EntityAuthentication) {
        console.log("Save authen user ", JSON.stringify(entityAuthentication.getToken()))
    }

}