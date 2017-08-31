function Events() {

    this.checkLogin = checkLogin;

    return this;

    function checkLogin() {
        display.loading();
        login.checkFbLogin();
    }
}