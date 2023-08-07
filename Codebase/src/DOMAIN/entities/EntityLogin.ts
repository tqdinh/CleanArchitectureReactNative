export default class EntityLogin {
    private username: string;
    private password: string
    constructor(_username: string, _passwrd: string) {
        this.username = _username;
        this.password = _passwrd
    }
    is_valid_username = () => {
        return (null != this.username && null != this.password)
    }
    getPassword = () => {
        return this.password
    }

    getUsername = () => {
        return this.username
    }
}