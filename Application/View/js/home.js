//(function() {

    var title = document.getElementById('title'),
        Xval = 4,
        Yval = 4;
    
    function rotateTextShadow(el, max, color, blur, clockWise) {
        setTimeout(function() {
            if (clockWise) {
                if (Xval == max && Yval < max) {
                    Yval++;
                } else if (Yval == max && Xval > -max) {
                    Xval--;
                } else if (Xval == -max && Yval > -max) {
                    Yval--;
                } else if (Yval == -max && Xval < max) {
                    Xval++;
                }
            } else {
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
            printShadow();
            rotateTextShadow(el, max, color, blur, clockWise);

            function printShadow() {
                el.style.textShadow = Xval+'px '+Yval+'px '+blur+'px '+color;
            }
        }, 20);
    }

    function goTo(url) {
        window.location.href = url;
    }

    rotateTextShadow(title, 4, '#000', 7, false);

//})();