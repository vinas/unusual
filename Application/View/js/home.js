function Home() {

    this.goTo = goTo;

    init();

    return this;

    function init() {
        display.rotateTextShadow(document.getElementById('title'), 4, '#000', 7, false);
        login.handleLogin();
    }

    function goTo(url) {
        window.location.href = url+'?sessionToken='+user.accessToken;
    }

}
