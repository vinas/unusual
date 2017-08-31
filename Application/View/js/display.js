function Display() {

    var Xval = false,
        Yval = false,
        title = document.getElementById('title');

    this.rotateTextShadow = rotateTextShadow;
    
    return this;

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
