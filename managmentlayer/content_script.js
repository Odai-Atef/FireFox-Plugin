// Put all the javascript code here, that you want to execute after page load.
console.log("Odai plugin has been loaded ");
var API = "http://35.159.18.195/api";
var handler = null;

function getHandler() {
    try {
        var new_handler = document.getElementsByClassName("js-account-summary")[0].getElementsByTagName('a')[0].getAttribute("data-user-name");
        if (new_handler && handler != new_handler) {
            browser.storage.local.set({
                "handler": new_handler
            }).then(() => {
            });
        }
    } catch (e) {

    }
}

browser.storage.onChanged.addListener(new_storage);

function new_storage(data) {
    console.log(data);
    if (data['tasks'] != undefined) {
        if (data['tasks'].newValue.type == 'follow') {
            window.open("https://www.twitter.com/" + data['tasks'].newValue.data);

        }
    }
}

function createColumn() {
    document.getElementsByClassName("js-app-search-input app-search-input search-input")[0].value = "السعودية  OR ksa";
    document.getElementsByClassName("js-perform-search txt-size--14 search-input-perform-search")[0].click()
}

function followAccount() {
    var ele = document.getElementsByClassName("css-18t94o4 css-1dbjc4n r-1niwhzg r-p1n3y5 r-sdzlij r-1phboty r-rs99b7 r-1w2pmg r-1vuscfd r-1dhvaqw r-1ny4l3l r-1fneopy r-o7ynqc r-6416eg r-lrvibr");
    if (ele[0] !== undefined) {
        ele[0].click();
        browser.storage.local.get().then((cached_data) => {
            var current_user = window.location.href.replace("https://www.twitter.com/","").replace("https://twitter.com/","") ;
            if (current_user == cached_data['tasks'].data) {
                var done_tasks = cached_data['tasks'];
                cached_data['done_tasks'] = done_tasks;
                browser.storage.local.set(cached_data).then((d)=>{
                    setTimeout(() => {
                        window.close();
                    }, 1000);
                });
            }
        });

    }
}

//Always check for handlers
setTimeout(() => {
    getHandler();
    followAccount();
}, 3000)
setInterval(function () {
    getHandler();
}, 60000);
