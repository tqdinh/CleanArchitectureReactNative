export default class EntityAuthentication {
    private token: string | null
    private refresh: string | null
    private avatar: string | null

    // add more properties here
    constructor(_token: string, _refresh: string, _avatar: string) {
        this.token = _token
        this.refresh = _refresh
        this.avatar = _avatar
    }

    is_valid() {
        return null !== this.token && "" != this.token
    }
    getToken() {
        return this.token
    }
}