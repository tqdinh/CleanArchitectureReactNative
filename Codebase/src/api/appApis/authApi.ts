import { AxiosAPI } from "api/AxiosAPI"
import { REQUEST_METHODS } from "api/iAPI"
import baseURL, { APIPath } from "api/path"
import { AuthRequestPayload } from "redux/auth/authSlice"


async function login_tmp(_method: REQUEST_METHODS, _data: AuthRequestPayload): Promise<any> {
    const api = new AxiosAPI({ baseURL: baseURL, path: APIPath.LOGIN_USER_PASS, method: _method, data: _data })
    const res = await api.getClientRequest()
    return res
}

export {
    login_tmp
}