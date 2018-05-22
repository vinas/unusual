document.addEventListener("DOMContentLoaded", function(event) {

    login = Login();
    setup = Setup();
    unusual = UnusualDevServices();
    events = Events();
    calc = Calculator();
    display = Display();
    level = Level();
    dialogs = (typeof Dialogs !== 'undefined') ? Dialogs() : false;
    ajax = Ajax();
    game = Game();

    if (setup.areSettingsOk()) {
        user.accessToken = login.getUrlParam('sessionToken');
        if (user.accessToken) {
            login.fetchUserInfo(user.accessToken);
            display.startButton();
            return;
        }
        window.location.href = '/';
    }

});
