import EntityAuthentication from "DOMAIN/entities/EntityAuthentication";
import { LoginDataSource } from "./LoginDataSource";

interface LoginLocalInterface {
    SaveAuthentication(entityAuthentication: EntityAuthentication): any
}

export class LoginLocalDataSource extends LoginDataSource implements LoginLocalInterface {

    SaveAuthentication(entityAuthentication: EntityAuthentication) {
        throw new Error("Method not implemented.");
    }

    Logout(): void {
        console.log("clear local DB here")
    }
    ResetQuerryStatus() {

    }


}