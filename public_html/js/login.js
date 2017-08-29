function Login() {

    this.checkFbLogin = checkFbLogin;
    this.checkForFbAccessCode = checkForFbAccessCode;
    this.getFbAccessToken = getFbAccessToken;
    this.getUserInfo = getUserInfo;

    return this;

    function checkFbLogin(game, clientId) {
        window.location.href = 'https://www.facebook.com/v2.10/dialog/oauth?client_id='+clientId+'&redirect_uri=http://unusualdev.com/'+game+'/';
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
    function getFbAccessToken(game, clientId, secret, code) {
        if (code)
            $.get(
                'https://graph.facebook.com/v2.10/oauth/access_token?client_id='+clientId+'&redirect_uri=http://unusualdev.com/'+game+'/&client_secret='+secret+'&code='+code,
                fetchUserInfo
            );
    }

    function fetchUserInfo(info) {
        if (info.access_token) {
            user.accessToken = info.access_token;
            $.get(
                'https://graph.facebook.com/me?fields=first_name,name,email,gender,picture,birthday,age_range,hometown,locale,location&access_token='+user.accessToken,
                    function(res) {
                        user.firstName = res.first_name;
                        user.name = res.name;
                        user.fbId = res.id;
                        user.picture = res.picture.data.url;
                    }
                );
        }
    }

    function getUserInfo() {
        return user;
    }

}