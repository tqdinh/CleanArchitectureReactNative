import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { QUERRY_STATUS } from "api/iAPI";
import { ResponeInterface } from "redux/ResponeInterface";
import { RootState } from "redux/store";

export interface AuthRequestPayload {
    username: string
    password: string
    // need to add other properties
}

export interface AuthResponsePayload extends ResponeInterface {
    access: string
    refresh: string
    avatar: string
    username: string
    // need to add other properties
}
const initialState: AuthResponsePayload = {
    access: "",
    refresh: "",
    avatar: "",
    username: "",
    STATUS_QUERRY: QUERRY_STATUS.IDLE
}


const authSlice = createSlice({
    name: 'AuthSlice',
    initialState,
    reducers: {
        login(state, action: PayloadAction<AuthRequestPayload>) {
            state.STATUS_QUERRY = QUERRY_STATUS.LOADING
        },
        loginSuccess(state, action: PayloadAction<AuthResponsePayload>) {
            state.access = action.payload.access
            state.avatar = action.payload.avatar
            state.refresh = action.payload.refresh
            state.username = action.payload.username
            state.STATUS_QUERRY = QUERRY_STATUS.SUCCESS
        },
        loginFail(state, action: any) {
            state.STATUS_QUERRY = QUERRY_STATUS.FAIL
        },
        RESET_STATUS(state) {
            state.STATUS_QUERRY = QUERRY_STATUS.IDLE
        },
        logout(state) {
            state.access = initialState.access
            state.avatar = initialState.avatar
            state.refresh = initialState.refresh
            state.username = initialState.username
        }
    }
})
export const { actions: authActions, reducer: authReducer } = authSlice
export const selectAuth = (state: RootState) => state.auth