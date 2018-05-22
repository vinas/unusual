function Login() {

    var url = new URL(window.location.href);

    this.checkFbLogin = checkFbLogin;
    this.getUserInfo = getUserInfo;
    this.handleLogin = handleLogin;
    this.logout = logout;
    this.getUrlParam = getUrlParam;
    this.fetchUserInfo = fetchUserInfo;

    return this;

    function logout() {
        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        user = {};
        window.location.href = '/';
    }

    function handleLogin() {
        var accessToken = readCookie(),
            accessCode = getUrlParam('code'),
            error = getUrlParam('error') === 'true';

        if (accessToken) {
            fetchUserInfo(accessToken, true, display.games);
            return;
        }
        if (accessCode) {
            getFbAccessToken(accessCode);
            return;
        }
        if (error) {
            display.loginError();
            return;
        }

        display.loginButton();
    }

    function checkFbLogin() {
        window.location.href = 'https://www.facebook.com/v2.10/dialog/oauth?client_id=309691342772623&redirect_uri=http://unusualdev.com/';
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
                function(data) { fetchUserInfo(data.access_token, true, display.games); },
                handleError
            );
    }

    function fetchUserInfo(accessToken, loadPicture, callback) {
        user.accessToken = accessToken;
        ajax.get(
            'https://graph.facebook.com/me?fields=first_name,name,email,gender,picture,birthday,age_range,hometown,locale,location&access_token='+user.accessToken,
            function(res) {
                populateUser(res, storeCookie);
                if (loadPicture) {
                    document.getElementById('userPicture').style.backgroundImage = "url('"+res.picture.data.url+"')";
                    document.getElementById('userPicture').style.display = 'block';
                }
                if (callback) callback();
            },
            handleError
        );
    }

    function getUserInfo() {
        return user;
    }

    function handleError(res) {
        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        window.location.href = "/?error=true";
    }

    function populateUser(data, callback) {
        user.firstName = data.first_name;
        user.name = data.name;
        user.fbId = data.id;
        user.picture = data.picture.data.url;
        if (callback) callback(user);
    }

    function storeCookie(obj) {
        var cookieStr = '';
        for (key in obj) {  
            cookieStr += key +'='+ obj[key] +';';
        }
        document.cookie = cookieStr;
    }

    function readCookie() {
        var result = document.cookie.match(new RegExp('accessToken=([^;]+)'));
        return (result && result[1]) ? result[1] : false;
    }

    function getUrlParam(param) {
        return url.searchParams.get(param);
    }

}
