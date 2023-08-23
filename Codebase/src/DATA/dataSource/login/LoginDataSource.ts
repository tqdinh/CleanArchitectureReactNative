import { useDispatch } from "react-redux";
import CommonDataSource from "../CommonDataSource";

export abstract class LoginDataSource implements CommonDataSource {
    protected dispatch = useDispatch()
    abstract Logout(): any
    abstract ResetQuerryStatus(): any
}