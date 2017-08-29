function Setup() {
    this.loadLevelMap = loadLevelMap;
    this.resetGame = resetGame;
    this.hideHidables = hideHidables;
    this.enableKeyboard = enableKeyboard;
    this.preventDblClick = preventDblClick;
    this.setClassProp = setClassProp;
    this.loadContent = loadContent;
    this.prepareSoundsForMobile = prepareSoundsForMobile;
    this.areSettingsOk = areSettingsOk;
    this.handleLogin = handleLogin;

    return this;

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
            document.getElementById('startGame').style.display = 'none';
            document.getElementById('errorScreen').innerHTML = '<br/><br/>&nbsp;&nbsp;&nbsp;Only playable on mobile devices!<br/><br/>=O';
            document.getElementById('errorScreen').style.display = 'block';
            return false;
        }
        if (!isLandscape()) {
            document.getElementById('startGame').style.display = 'none';
            document.getElementById('errorScreen').innerHTML = '<br/><br/>&nbsp;&nbsp;&nbsp;Turn your phone/tablet to <b>landscape</b> mode and <a class="errorLink" id="errorLink" onclick="window.location.reload()">refresh it</a>!<br/><br/>=O';
            document.getElementById('errorScreen').style.display = 'block';
            Xval = 4;
            Yval = 4;
            rotateTextShadow(document.getElementById('errorLink'), 4, '#C1A31D', 7, true);
            return false;
        }


        return true;
    }

    function prepareSoundsForMobile() {
        musicTheme.volume = 0;
        charJumpSound.volume = 0;
        ufoLaserSound.volume = 0;
        charArrowSound.volume = 0;
        pigJumpSound.volume = 0;
        explosionSound.volume = 0;

        musicTheme.play();
        musicTheme.pause();
        charJumpSound.play()
        charJumpSound.pause();
        ufoLaserSound.play();
        ufoLaserSound.pause();
        charArrowSound.play();
        charArrowSound.pause();
        pigJumpSound.play();
        pigJumpSound.pause();
        explosionSound.play();
        explosionSound.pause();

        charJumpSound.currentTime = 0;
        ufoLaserSound.currentTime = 0;
        charArrowSound.currentTime = 0;
        pigJumpSound.currentTime = 0;
        explosionSound.currentTime = 0;

        musicTheme.volume = .8;
        charJumpSound.volume = .6;
        ufoLaserSound.volume = 1;
        charArrowSound.volume = 1;
        pigJumpSound.volume = 1;
        explosionSound.volume = 1;
    }

    function loadContent()
    {
     var ImgsToPreload = new Array(
            'img/charman/charman-01.png',
            'img/charman/charman-bow.gif',
            'img/charman/charman-jump.gif',
            'img/charman/charman-run.gif',
            'img/charman/charman-swim.gif',
            'img/interactions/explosion01.gif'
        );
        preloadImages(ImgsToPreload);
        setSounds();
    }

    function preventDblClick() {
        document.ondblclick = function(e) { e.preventDefault(); };
    }

    function enableKeyboard() {
        document.addEventListener('keydown', function(e) {
            switch (e.which) {
                case 39:
                    events.tapMoveRight();
                    break;
                case 37:
                    events.tapMoveLeft();
                    break;
                case 32:
                    events.tapAttack();
                    break;
                case 17:
                    events.tapJump();
            }
        });

        document.addEventListener('keyup', function(e) {
            setTimeout(function() {
                switch (e.which) {
                    case 39:
                        commands.right = false;
                        break;
                    case 37:
                        commands.left = false;
                }
            }, 50);
        });
    }

    function resetGame() {
        musicTheme.play();
        hideHidables();
        resetGameVariables();
        cancelAllActions();
        cancelAllcommands();
        resetCharman();
        level.loadLevelTriggers();
        loadLevelMap();
        loadEnemyList();
    }

    function resetGameVariables() {
        topPos = CHARBASEFLOOR;
        leftPos = 0;
        currMap = 0;
        gameTime = 0;
        timer = 0;
        time = +new Date();
    }

    function cancelAllcommands() {
        commands.right = false;
        commands.left = false;
        commands.fire = false;
        commands.jump = false;
    }

    function cancelAllActions() {
        actions.canMove = true;
        actions.canJump = true;
        actions.canFire = true;
        actions.jumping = false;
        actions.firing = false;
        actions.swimming = false;
        actions.falling = false;
        actions.cancelShot = false;
        actions.shooting = false;
        actions.lastDirection = 'right';
        actions.abduction = false;
    }

    function resetCharman() {
        charDiv.style.opacity = 1;
        charDiv.style.top = topPos+'%';
        charDiv.style.left = leftPos+'%';
        charDiv.style.display = 'block';
    }

    function loadEnemyList() {
        enemies = [
                document.getElementById('ufo'),
                document.getElementById('pig'),
                document.getElementById('alien'),
                document.getElementById('bigBoss')
            ];
    }

    function loadLevelMap() {
        var floorPos = 0,
            floorTopPos;

        document.getElementById('stage').innerHTML = (currMap + 1) + ' / ' + level.loadMapArr().length;
        document.getElementById('level').innerHTML = level.current;

        mapIndexArray = [];
        mapArr = level.loadMapArr()[currMap];

        display.setBackgroundImg();
        display.clearBackground();

        mapArr.forEach(buildMap);

        function buildMap(mapItem) {
            floorTopPos = FLOORS[mapItem[2]];
            if (mapItem[0].indexOf('fragile') == -1) {
                bkgLayer.innerHTML += '<img class="floor '+mapItem[1]+'" style="left: '+floorPos+'%; top: '+floorTopPos+'%" src="img/map/floor/'+mapItem[0]+'" />';
            } else {
                bkgLayer.innerHTML += '<img class="floor fragile '+mapItem[1]+'" style="left: '+floorPos+'%; top: '+floorTopPos+'%" src="img/map/floor/'+mapItem[0]+'" />';
            }
            switch (mapItem[1]) {
                case 'single':
                    floorPos += SINGLEBLOCK;
                    break;
                case 'double':
                    floorPos += DOUBLEBLOCK;
                    break;
            }
            mapIndexArray.push(floorPos);
        }
    }

    function hideHidables() {
        setClassProp('hidable', 'display', 'none');
    }

    function setClassProp(className, prop, value) {
        var els = document.getElementsByClassName(className),
            i;
        for (i = 0; i < els.length; i++) {
            els[i].style[prop] = value;
        }
    }

    function preloadImages(images) {
        var img;
        for (i = 0; i < images.length; i++) {
            img = new Image();
            img.src = images[i];
        }
    }

    function setSounds() {
        musicTheme = new Audio('audio/Pocketmaster_-_07_-_Ride.mp3');
        charJumpSound = new Audio('audio/SFX_Jump_31_0.mp3');
        ufoLaserSound = new Audio('audio/tir.mp3');
        charArrowSound = new Audio('audio/laserfire01.ogg.mp3');
        pigJumpSound = new Audio('audio/jumppp22.ogg.mp3');
        explosionSound = new Audio('audio/8bit_bomb_explosion.wav.mp3');
    }

    function isLandscape() {
        return window.innerWidth > window.innerHeight;
    }

    function isMobile() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };

    function handleLogin() {
        var accessCode = login.checkForFbAccessCode(),
            loginAttempts = 0;
        if (accessCode && !user.fbId) {
            //display.loadingButton();
            document.getElementById('loadingImg').style.display = 'block';
            document.getElementById('startGameImg').style.display = 'none';
            document.getElementById('loginButtonImg').style.display = 'none';
            login.getFbAccessToken('asciiworld', '466659723719256', 'c14236bb2b7f89a2c6f2aef5f7444fc0', accessCode);
            waitForUserInfo();
            return;
        } else {
            //display.loginButton();
            document.getElementById('loadingImg').style.display = 'none';
            document.getElementById('startGameImg').style.display = 'none';
            document.getElementById('loginButtonImg').style.display = 'block';
        }

        function waitForUserInfo() {
            setTimeout(function() {
                if (user.fbId) {
                    display.startButton();
                    return;
                }
                loginAttempts++;
                if (loginAttempts < 32) {
                    waitForUserInfo();
                    return;
                }
                display.loginButton();
            }, 250);
        }
    }
}