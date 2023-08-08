export enum APIPath {
    LOGIN_USER_PASS = '/guest/login/',
    LOGIN_OTP = '/otp/',
    VERIFY_OTP = '/guest/verify-otp/',
    REFRESH_TOKEN = '/refresh-token/',
    CRUD_USER = '/customer',
    CRUD_BASKET = '/basket/',
    BRANCH = '/branches',
    BRANCH_ITEM = '/branches/item/',
    MENU_CATEGORY = '/category/menu/',
    SERVICE_CATEGORY = '/category/service/',
    CHECKOUT = '/checkout/',
    ORDER = '/orders/',
    PASSCODE_CREATE = '/customer/set-pass-code/',
    PASSCODE_VERIFY = '/customer/verify/',
    PAYMENT = '/payment/'
}
const baseURL = 'https://dev.sapa.zien.vn/api'

export default baseURL