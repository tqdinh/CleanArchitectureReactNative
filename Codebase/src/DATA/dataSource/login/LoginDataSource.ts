import CommonDataSource from "../CommonDataSource";

export abstract class LoginDataSource implements CommonDataSource {
    abstract Logout(): any
    abstract ResetQuerryStatus(): any
}