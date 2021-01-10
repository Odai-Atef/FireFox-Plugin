var handler = null;
var last_event_time = Date.now();
unfollowAccount();
browser.storage.onChanged.addListener(newEvent);
//Always check for handlers
setTimeout(() => {
    getHandler();
    var task = getParameterByName("task");
    if (task == "follow") {
        followAccount();
    } else if (task == "unfollow") {
        unfollowAccount();
    }
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
            window.open("https://www.twitter.com/" + data.tasks.newValue.data + "task=follow");
        } else if (data.tasks.newValue.type == 'rule') {
            createColumn(data.tasks.newValue.data);
        } else if (data.tasks.newValue.type == 'unfollow') {
            window.open("https://www.twitter.com/" + data.tasks.newValue.data + "task=unfollow");
        }
    }
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
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

function unfollowAccount() {
    var ele = document.getElementsByClassName("css-18t94o4 css-1dbjc4n r-urgr8i r-42olwf r-sdzlij r-1phboty r-rs99b7 r-1w2pmg r-1vuscfd r-1dhvaqw r-1ny4l3l r-1fneopy r-o7ynqc r-6416eg r-lrvibr");
    if (ele[0] !== undefined) {
        ele[0].click();
        setTimeout(() => {
            var ele_confirm = document.getElementsByClassName("css-901oao r-1awozwy r-jwli3a r-6koalj r-18u37iz r-16y2uox r-1qd0xha r-a023e6 r-b88u0q r-1777fci r-eljoum r-dnmrzs r-bcqeeo r-q4m81j r-qvutc0");
            if (ele_confirm[0] !== undefined) {
                ele_confirm[0].click()
            }
        }, 1000);
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
