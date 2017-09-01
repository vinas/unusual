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
            handleResponse(this, success, error);
        }
        xhttp.open("GET", uri, true);
        xhttp.send();
    }

    function post(uri, params, success, error) {
        xhttp.onreadystatechange = function() {
            handleResponse(this, success, error);
        }
        xhttp.open('POST', uri, true);
        xhttp.setRequestHeader("Content-type", "appplication/json;charset=UTF-8");
        xhttp.send(params);
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

    function handleResponse(res, success, error) {
        if (res.readyState == 4) {
            if (res.status == 200) {
                if (success) {
                    success(JSON.parse(res.responseText))
                } else {
                    console.log(res.responseText);
                }
                return;
            } else {
                if (error) {
                    error(JSON.parse(res.responseText));
                    return;
                }
                console.log(res.responseText);
            }
        }
    }

}
