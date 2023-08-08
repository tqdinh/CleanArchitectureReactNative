
import { REQUEST_METHODS } from "api/iAPI"
import { call, delay, put, takeLatest } from "redux-saga/effects"
import { login_tmp } from '../api/appApis/authApi'
import { AuthRequestPayload, authActions } from "redux/auth/authSlice"
import { PayloadAction } from "@reduxjs/toolkit"
function* handleLogin(action: PayloadAction<AuthRequestPayload>): any {
  try {
    const res = yield call(login_tmp, REQUEST_METHODS.POST, action.payload)
    yield put(authActions.loginSuccess(res))
    delay(1000)
    yield put(authActions.RESET_STATUS())

  }
  catch (error: any) {
    yield put(authActions.loginFail(error.response))

  }
}

function* authSaga() {
  yield takeLatest(authActions.login, handleLogin)
}

export default authSaga