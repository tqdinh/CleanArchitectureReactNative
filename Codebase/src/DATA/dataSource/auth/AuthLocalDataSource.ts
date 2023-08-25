import EntityAuthentication from "DOMAIN/entities/EntityAuthentication";
import { AuthDataSource } from "./AuthDataSource";

interface AuthLocalInterface {
    SaveAuthentication(entityAuthentication: EntityAuthentication): any
}

export class AuthLocalDataSource extends AuthDataSource implements AuthLocalInterface {
    SaveAuthentication(entityAuthentication: EntityAuthentication) {
        console.log(`The Token is about to save: ${entityAuthentication.getToken()} ${new Date()}`)
    }

    Logout(): void {
        console.log("clear local DB here")
    }
    ResetQuerryStatus() {

    }


}