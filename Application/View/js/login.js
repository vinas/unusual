function Login() {

    this.checkFbLogin = checkFbLogin;
    this.checkForFbAccessCode = checkForFbAccessCode;
    this.getFbAccessToken = getFbAccessToken;
    this.getUserInfo = getUserInfo;

    return this;

    function checkFbLogin() {
        window.location.href = 'https://www.facebook.com/v2.10/dialog/oauth?client_id=309691342772623&redirect_uri=http://unusualdev.com/';
    }

    function checkForFbAccessCode() {
        var url = new URL(window.location.href);
        return url.searchParams.get('code');
    }

    /**
     * @String game's folder
     * @String fb's client_id
     * @String fb's client secret
     * @String fb given access code
    */
    function getFbAccessToken(code) {
        if (code)
            ajax.get(
                'https://graph.facebook.com/v2.10/oauth/access_token?client_id=309691342772623&redirect_uri=http://unusualdev.com/&client_secret=13e58f0492789ec1cfc6b44c87e9bd88&code='+code,
                fetchUserInfo
            );
    }

    function fetchUserInfo(data) {
        if (data.access_token) {
            user.accessToken = data.access_token;
            ajax.get(
                'https://graph.facebook.com/me?fields=first_name,name,email,gender,picture,birthday,age_range,hometown,locale,location&access_token='+user.accessToken,
                function(res) {
                    user.firstName = res.first_name;
                    user.name = res.name;
                    user.fbId = res.id;
                    user.picture = res.picture.data.url;
                    display.games();
                }
            );
        }
    }

    function getUserInfo() {
        return user;
    }

}
