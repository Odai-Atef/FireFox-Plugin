// Put all the javascript code here, that you want to execute after page load.
console.log("Odai plugin has been loaded ");
var openedAt = new Date();
var API="http://35.159.18.195/api";
// setTimeout(function () {
//     createColumn();
// }, 10000)

function getHandler() {
    handler = null;
    try {
        var handler = document.getElementsByClassName("js-account-summary")[0].getElementsByTagName('a')[0].getAttribute("data-user-name");
    } catch (e) {

    }
    return handler;
}

function createColumn() {
    document.getElementsByClassName("js-app-search-input app-search-input search-input")[0].value="السعودية  OR ksa";
    document.getElementsByClassName("js-perform-search txt-size--14 search-input-perform-search")[0].click()
}

function followAccount() {
    var ele = document.getElementsByClassName("css-18t94o4 css-1dbjc4n r-1niwhzg r-p1n3y5 r-sdzlij r-1phboty r-rs99b7 r-1w2pmg r-1vuscfd r-1dhvaqw r-1ny4l3l r-1fneopy r-o7ynqc r-6416eg r-lrvibr");
    ele[0].click();
}

setInterval(function () {
    var handler = getHandler();
    if (handler != null) {
        try {
            var xhttp = new XMLHttpRequest();
            console.log(API+"/tasks/index");
            xhttp.open("POST", API+"/tasks/index", true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.onreadystatechange = function () {
                console.log(this.responseText);
                if (this.readyState == 4 && this.status == 200) {
                    var response = this.responseText;
                    console.log(response);
                } else {
                    // window.open("https://twitter.com","_blank");
                    console.log("Fail to get the tasks");
                }
            };
            var data = {account_handler: handler, started_at: openedAt.getTime()};
            console.log(data);
            xhttp.send(JSON.stringify(data));
        } catch (e) {
            console.log(e)
        }
    }
}, 5000);
