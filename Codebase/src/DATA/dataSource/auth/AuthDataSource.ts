import { useDispatch } from "react-redux";
import CommonDataSource from "../CommonDataSource";

export abstract class AuthDataSource implements CommonDataSource {
    protected dispatch = useDispatch()
    abstract Logout(): any
    abstract ResetQuerryStatus(): any
}