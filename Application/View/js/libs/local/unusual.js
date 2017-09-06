/**
* Unusual Dev Class
*
* @description This class' purpose is to serve on actions related
*               to the unusual dev's main concept.
* @author Vinas de Andrade <vinas.andrade@gmail.com>
* @since 2017/09/06
* @version 1.17.0906
* @license SaSeed\license.txt
*/
function UnusualDevServices() {

    this.saveGameScore = saveGameScore;
    this.getRanking = getRanking;
    this.getUserInfo = getUserInfo;
    this.updateUserInfo = updateUserInfo;

    return this;
    
    function saveGameScore(gameId, score, callback) {
        user.lastScore = score;
        user.lastScoreDateTime = formattedDateTime();
        user.gameId = gameId;
        ajax.post('/api/Games/saveLastScore', user, callback);
    }

    function getRanking(gameId, callback) {
        ajax.get('/api/Games/getRanking/'+gameId, callback);
    }

    function getUserInfo() {
        console.log('getUserInfo');
    }

    function updateUserInfo() {
        console.log('updateUserInfo');
    }

    function formattedDateTime() {
        var currentdate = new Date(); 
        return addZero(currentdate.getDate()) + "/"
            + addZero(currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " @ "  
            + addZero(currentdate.getHours()) + ":"  
            + addZero(currentdate.getMinutes()) + ":" 
            + addZero(currentdate.getSeconds());
    }

    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

}