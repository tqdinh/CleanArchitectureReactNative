import ApiApp, { ApiRequest, HTTPStatusCode } from "./iAPI";
import axios, { AxiosResponse } from 'axios'



export class AxiosAPI implements ApiApp {
    request: ApiRequest | null = null;
    private axiosInstance = axios.create()

    constructor(_request: ApiRequest) {
        this.request = _request
        this.axiosInstance.interceptors.request.use(
            function (config) {
                // Do something before request is sent
                return config
            },
            function (error) {
                // Do something before request is sent
                return Promise.reject(error)
            }
        )
        this.axiosInstance.interceptors.response.use(
            function (response: AxiosResponse) {
                // Any status code that lie within the range of 2xx cause this function to trigger
                // Do something with response data
                return response.data
            },
            function (error) {
                // Any status codes that falls outside the range of 2xx cause this function to trigger
                // Do something with response error
                switch (error.response.status) {
                    case HTTPStatusCode.BAD_REQUEST:
                        break
                    case HTTPStatusCode.NOT_FOUND:
                        break
                    case HTTPStatusCode.UNAUTHORIZED:
                    case HTTPStatusCode.FORBIDDEN:
                        break
                    default:
                        break
                }
                return Promise.reject(error)
            }
        )

    }



    getClientRequest() {
        if (this.axiosInstance && this.request) {
            return this.axiosInstance.request({
                method: this.request.method,
                baseURL: this.request.baseURL,
                url: this.request.path,
                params: this.request.params,
                data: this.request.data,
                headers: this.request.headers
            })
        }
        else return null

    }


}