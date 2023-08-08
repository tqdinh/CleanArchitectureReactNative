
export interface ApiRequest {
    method: 'get' | 'post' | 'put' | 'delete' | 'patch'
    baseURL: string
    path: string
    params?: Record<string, string | number | boolean | undefined | Array<any>>
    data?: Record<string, string | number | boolean | any>
    headers?: Record<string, string | number | boolean>
}

export enum HTTPStatusCode {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504
}

export enum QUERRY_STATUS {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    FAIL = 'FAIL'
}

export enum REQUEST_METHODS {
    POST = 'post',
    GET = 'get',
    PUT = 'put',
    PATCH = 'patch',
    DELETE = 'delete'
}

export default interface ApiApp {
    request: ApiRequest | null;
}

