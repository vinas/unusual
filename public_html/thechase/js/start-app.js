document.addEventListener("DOMContentLoaded", function(event) {

    setup = Setup();
    events = Events();
    unusual = UnusualDevServices();
    calc = Calculator();
    display = Display();
    resizer = Resizer();
    game = Game();
    ajax = Ajax();
    login = Login();

    if (setup.areSettingsOk()) {
        user.accessToken = login.getUrlParam('sessionToken');
        if (user.accessToken) {
            login.fetchUserInfo(user.accessToken);
            game.init();
            return;
        }
        window.location.href = '/';
    }

});
