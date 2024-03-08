
class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    static isValid(user) {
        return user instanceof User && user.username && user.password;
    }
}

module.exports = User;
