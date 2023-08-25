export default class EntityLogin {
    private uname: string;
    private pass: string
    constructor(_username: string, _passwrd: string) {
        this.uname = _username;
        this.pass = _passwrd
    }
    is_valid_username = () => {
        return (null != this.uname && null != this.pass)
    }
    getPassword = () => {
        return this.pass
    }

    getUsername = () => {
        return this.uname
    }
}