import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'AuthSlice',
    initialState: {},
    reducers: {}
})
export const { actions: authActions, reducer: authReducer } = authSlice