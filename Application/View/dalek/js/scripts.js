var ajax = Ajax(),
    login = Login(),
    unusual = UnusualDevServices(),
    user = {};


function areSettingsOk() {
    var Xval, Yval;
    
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

    if (!isMobile()) {
        document.getElementById('content').style.backgroundColor = '#000';
        document.getElementById('content').style.color = '#FFF';
        document.getElementById('content').innerHTML = '<br/><br/>&nbsp;&nbsp;&nbsp;Only playable on mobile devices!<br/><br/>=O';
        return false;
    }
    if (!isLandscape()) {
        document.getElementById('content').style.backgroundColor = '#000';
        document.getElementById('content').style.color = '#FFF';
        document.getElementById('content').innerHTML = '<br/><br/>&nbsp;&nbsp;&nbsp;Turn your phone/tablet to <b>landscape</b> mode and <a class="errorLink" id="errorLink" onclick="window.location.reload()">refresh it</a>!<br/><br/>=O';
        document.getElementById('content').style.display = 'block';
        Xval = 4;
        Yval = 4;
        rotateTextShadow(document.getElementById('errorLink'), 4, '#C1A31D', 7, true);
        return false;
    }

    return true;
}

function isLandscape() {
    return window.innerWidth > window.innerHeight;
}

function isMobile() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

user.accessToken = login.getUrlParam('sessionToken');
if (user.accessToken) {
    login.fetchUserInfo(user.accessToken);
    init();
} else {
    window.location.href = '/';
}


function init() {

    var tecla,
    keyBump,
    dalekMovement,
    posDalek = 0,
    shotVis = false,
    tardisVis = true,
    dalekSpeed = 10,
    tiroWidth = 15,
    MAPHORSIZE = 900,
    MAPVERSIZE = 400,
    dalekHeight = 63,
    CROSSBORDERTOLERANCE = 15,
    TARDISHEIGHT = 60,
    tardisSpeed = 5,
    posTardis,
    score = 0;

    var posShot = new Array(0 ,0);

    $(document).on("dblclick", function() {
        return false;
    });

    $(document).on("keydown", function(e) {
        tecla = e.which;
        //if (tecla != 123) return false;
    });

    $(document).on("keyup", function(e) {
        tecla = false;
        //if (tecla != 123) return false;
    });

    $(document).on("ready", function() {

        $.setupGame = function() {
            tardisVis = true;
            MAPHORSIZE = $("#content").css("width").replace(new RegExp("px", 'g'), "");
            MAPVERSIZE = $("#content").css("height").replace(new RegExp("px", 'g'), "");
        }

        $.resetGame = function() {
            score = 0;
            $("#score").html('0');
            tardisSpeed = 5;
            posTardis = new Array(
                    (MAPHORSIZE - 45),
                    Math.floor(Math.random() * (MAPVERSIZE - TARDISHEIGHT))
                );
            tardisVis = true;
            setClassProp('hidable', 'display', 'none');
            document.getElementById('game').style.display = 'block';
            setTimeout(function() {
                    $("#dalek").css("top", 0);
                    $("#dalek").css("left", 10);
                    $("#tardis").css("top", posTardis[1]);
                    $("#tardis").css("left", posTardis[0]);
                    $.moveTardis();
                },
                300
            );
        }

        $.moveTardis = function() {
            if (tardisVis === true) {

                var tardisInterval = setInterval(function() {
                    $("#tardis").css("left", posTardis[0]);
                    $("#tardis").css("top", posTardis[1]);

                    if (posTardis[0] > 0) {
                        posTardis[0] = posTardis[0] - tardisSpeed;
                        $("#tardis").animate(
                            {left: posTardis[0]},
                            30
                        );
                    } else {
                        $("#tiro").hide();
                        tardisVis = false;
                        clearInterval(tardisInterval);
                        endGame();
                    }
                }, 50);
            }
        }

        $.shoot = function() {
            if (shotVis === false) {
                shotVis = true;
                tiro = $("#tiro");
                posShot[0] = 60;
                posShot[1] = posDalek + tiroWidth + 5;
                tiro.css("top", posShot[1]);
                tiro.css("left", posShot[0]);
                tiro.show();
                var shotInterval = setInterval(function() {
                    if ($.hit()) {
                        tardisVis = false;
                        $("#tardis").hide();
                        score = score + 1;
                        $("#score").html(score);
                        tiro.hide();
                        shotVis = false;
                        $.resetTardis();
                        clearInterval(shotInterval);
                    } else if (posShot[0] <= (MAPHORSIZE - tiroWidth - 5)) {
                        posShot[0] = posShot[0] + 10;
                        tiro.css("left", posShot[0]);
                    } else {
                        tiro.hide();
                        shotVis = false;
                        clearInterval(shotInterval);
                    }
                }, 5);
            }
        }

        $.resetTardis = function() {
            tardisVis = false;
            $("#tardis").hide();
            tardisSpeed = tardisSpeed + 1
            posTardis[0] = MAPHORSIZE - 45;
            posTardis[1] = Math.floor(Math.random() * (MAPVERSIZE - TARDISHEIGHT));
            $("#tardis").css("left", posTardis[0]);
            $("#tardis").css("top", posTardis[1]);
            setTimeout(function() {
                $("#tardis").show();
                tardisVis = true;
            }, 50);

        }

        $.hit = function() {
            if (
                (
                    (posShot[0] >= (posTardis[0] - 20)) &&
                    (posShot[0] < (posTardis[0] + 35))
                ) && (
                    (posShot[1] >= posTardis[1]) &&
                    (posShot[1] < (posTardis[1] + TARDISHEIGHT))
                )
            ){
                return true;
            }
            return false;
        };

        $(".tapMove").on("touchstart", function() {
            posY = event.touches[0].pageY;
            posDalek = posY - 28;
            $("#dalek").animate(
                {top: posDalek},
                100
            );
            //$("#dalek").css("top", posDalek);
        });
        
        $(".tapShoot").on("touchstart", function() {
            $.shoot();
        });

        /*-*-*-*-* NEW *-*-*-*-*/

        function endGame() {
            unusual.saveGameScore(5, score, function() {
                document.getElementById('ranking').innerHTML = 'loading ranking...';
                document.getElementById('ranking').style.display = 'block';
                unusual.getRanking(5, updateRanking);
            });
            setClassProp('hidable', 'display', 'none');
        }

        function updateRanking(content) {
            var output = '<div class="rankingTitle">Ranking <label class="obs">&nbsp;until 31/10/2017</label></div>';
            var order;
            for (i = 0; i < content.length; i++) {
                order = i + 1;
                output += '<div class="rankingItem">' + order + setOrdinal(order) + ' - ' + content[i].name + ' - ' + content[i].score + '</div>';
            }
            output += '<br/><label class="startTap" onclick="$.resetGame();">TARDIS shot '+score+' times! - tap to start again</label>';
            document.getElementById('ranking').innerHTML = output;
        }

        function setOrdinal(order) {
            if (order > 3) return 'th';
            if (order == 1) return 'st';
            if (order == 2) return 'nd';
            if (order == 3) return 'rd';
        }

        function addZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }

        function setClassProp(className, prop, value) {
            var els = document.getElementsByClassName(className),
                i;
            for (i = 0; i < els.length; i++) {
                els[i].style[prop] = value;
            }
        }

       /*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/
        document.getElementById('startGame').style.display = 'block';
        $.setupGame();

    });
}