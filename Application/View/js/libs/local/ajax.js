/**
* Ajax Class
*
* @description This class' purpose is to handle ajax requets.
* @author Vinas de Andrade <vinas.andrade@gmail.com>
* @since 2017/08/31
* @version 1.17.0831
* @license SaSeed\license.txt
*/
function Ajax() {

    var xhttp = new XMLHttpRequest();

    this.get = get;
    this.post = post;

    return this;

    function get(uri, success, error) {
        xhttp.onreadystatechange = function() {
            handleResponse(this.readyState, this.status, this.responseText, success, error);
        }
        xhttp.open("GET", uri, true);
        xhttp.send();
    }

    function post(uri, params, success, error) {
        xhttp.onreadystatechange = function() {
            handleResponse(this.readyState, this.status, this.responseText, success, error);
        }
        xhttp.open('POST', uri, true);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.setRequestHeader("Connection", "close");
        xhttp.send(populateFormData(params));
    }

    function populateFormData(params) {
        var data = new FormData();
        if (params) {
            for (var key in params) {
                data.append(key, params[key]);
            }
        }
        return data;
    }

    function handleResponse(readyState, status, responseText, success, error) {
        if (readyState == 4) {
            if (status == 200) {
                if (success) {
                    success(JSON.parse(responseText))
                } else {
                    console.log(responseText);
                }
                return;
            } else {
                if (error) {
                    error(JSON.parse(responseText));
                    return;
                }
                console.log(responseText);
            }
        }
    }

}
