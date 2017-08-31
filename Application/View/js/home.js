function Home() {

    this.goTo = goTo;

    init();

    return this;

    function init() {
        display.rotateTextShadow(document.getElementById('title'), 4, '#000', 7, false);
        handleLogin();
    }

    function goTo(url) {
        window.location.href = url;
    }

    function handleLogin() {
        var accessCode = login.checkForFbAccessCode();
        if (!accessCode) {
            display.loginButton();
            return;
        }
        login.getFbAccessToken(accessCode);
    }

}
