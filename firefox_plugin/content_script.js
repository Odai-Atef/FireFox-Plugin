var handler = null;
var last_event_time = Date.now();
browser.storage.onChanged.addListener(newEvent);
//Always check for handlers
setTimeout(() => {
    getHandler();
    followAccount();
}, 3000)

setInterval(() => {
    if ((Date.now() - last_event_time) / 1000 > 30) {
        getHandler();
    }

}, 10000);

//functions
function getHandler() {
    try {
        var new_handler = document.getElementsByClassName("js-account-summary")[0].getElementsByTagName('a')[0].getAttribute("data-user-name");
        if (new_handler && handler != new_handler) {
            browser.storage.local.get().then((cached_data) => {
                cached_data["handler"] = new_handler;
                cached_data["event"] = "EVENT_HANDLER_FETCHED";
                browser.storage.local.set(cached_data);
            });
        }
    } catch (e) {

    }
}

function newEvent(data) {
    console.log("new storage", data);
    last_event_time = Date.now();
    if (data['tasks'] != undefined && data.event.newValue == "EVENT_TASK_READY") {
        if (data.tasks.newValue.type == 'follow') {
            window.open("https://www.twitter.com/" + data.tasks.newValue.data);
        } else if (data.tasks.newValue.type == 'rule') {
            createColumn(data.tasks.newValue.data);
        }
    }
}

function createColumn(data) {
    if (document.getElementsByClassName("js-perform-search txt-size--14 search-input-perform-search")[0] != undefined) {
        document.getElementsByClassName("js-app-search-input app-search-input search-input")[0].value = data;
        document.getElementsByClassName("js-perform-search txt-size--14 search-input-perform-search")[0].click();
        browser.storage.local.get().then((cached_data) => {
            cached_data['event'] = "EVENT_TASK_DONE";
            browser.storage.local.set(cached_data);
        });
    }
}

function followAccount() {
    var ele = document.getElementsByClassName("css-18t94o4 css-1dbjc4n r-1niwhzg r-p1n3y5 r-sdzlij r-1phboty r-rs99b7 r-1w2pmg r-1vuscfd r-1dhvaqw r-1ny4l3l r-1fneopy r-o7ynqc r-6416eg r-lrvibr");
    if (ele[0] !== undefined) {
        ele[0].click();
    }
    browser.storage.local.get().then((cached_data) => {
        var current_user = window.location.href.replace("https://www.twitter.com/", "").replace("https://twitter.com/", "");
        if (current_user == cached_data['tasks'].data) {
            cached_data['event'] = "EVENT_TASK_DONE";
            browser.storage.local.set(cached_data).then((d) => {
                setTimeout(() => {
                    window.close();
                }, 1000);
            });
        }
    });
}

console.log("DMMIL has been loaded");
