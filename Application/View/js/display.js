function Display() {

    var Xval = false,
        Yval = false,
        title = document.getElementById('title');

    this.games = games;
    this.loading = loading;
    this.loginButton = loginButton;
    this.rotateTextShadow = rotateTextShadow;
    this.loginError = loginError;
    
    return this;

    function loginError() {
        loginButton();
        document.getElementById('loginError').style.display = 'block';
    }

    function loginButton() {
        document.getElementById('loginError').style.display = 'none';
        document.getElementById('games').style.display = 'none';
        document.getElementById('loading').style.display = 'none';
        document.getElementById('loginButton').style.display = 'block';
    }

    function games() {
        document.getElementById('loginError').style.display = 'none';
        document.getElementById('loginButton').style.display = 'none';
        document.getElementById('loading').style.display = 'none';
        document.getElementById('games').style.display = 'block';
    }

    function loading() {
        document.getElementById('loginError').style.display = 'none';
        document.getElementById('loginButton').style.display = 'none';
        document.getElementById('games').style.display = 'none';
        document.getElementById('loading').style.display = 'block';
    }

    function rotateTextShadow(el, max, color, blur, clockWise) {
        if (!isInitPosSet()) setTextShadowInitPos(max);
        setTimeout(function() {
            setTextShadowNextPos(max, clockWise);
            printShadow(el, Xval, Yval, blur, color);
            rotateTextShadow(el, max, color, blur, clockWise);

        }, 20);
    }

    function setTextShadowInitPos(x, y) {
        if (x) {
            Xval = x;
            Yval = (y) ? y : x;
            return;
        }
        resetTextShadowInitPos();
    }

    function resetTextShadowInitPos() {
        Xval = false;
        Yval = false;
    }

    function isInitPosSet() {
        return !(Xval===false && Yval===false);
    }

    function setTextShadowNextPos(max, clockWise) {
        if (clockWise) {
            calcNextClockwisePos(max);
            return;
        }
        calcNextAntiClockwisePos(max);
    }

    function printShadow(el, Xval, Yval, blur, color) {
        el.style.textShadow = Xval+'px '+Yval+'px '+blur+'px '+color;
    }

    function calcNextClockwisePos(max) {
        if (Xval == max && Yval < max) {
            Yval++;
        } else if (Yval == max && Xval > -max) {
            Xval--;
        } else if (Xval == -max && Yval > -max) {
            Yval--;
        } else if (Yval == -max && Xval < max) {
            Xval++;
        }
    }

    function calcNextAntiClockwisePos(max) {
        if (Xval == max && Yval > -max) {
            Yval--;
        } else if (Yval == -max && Xval > -max) {
            Xval--;
        } else if (Xval == -max && Yval < max) {
            Yval++;
        } else if (Yval == max && Xval < max) {
            Xval++;
        }
    }

}
