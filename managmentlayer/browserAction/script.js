var API = "http://35.159.18.195/api";
var handler = null;
browser.storage.onChanged.addListener(newEvent);


function newEvent(data) {
    checkHandler();
    updateDone(data);
    // document.getElementById("newEvent").innerHTML = "New Event";
}

function updateDone(data) {
    if (data['done_tasks'] != undefined) {
        try {
            var xhttp = new XMLHttpRequest();
            var requestd_data = {"account_handler": handler, "id": data['done_tasks'].newValue.id};

            xhttp.open("POST", API + "/tasks/executed", true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var response = JSON.parse(this.responseText);
                    if (response['status'] != undefined && response['status'] =="1") {
                        browser.storage.local.get().then((cached_data) => {
                            delete cached_data['done_tasks'];
                            delete cached_data['tasks']
                            browser.storage.local.set(cached_data);
                        });
                    }
                    document.getElementById("result").innerHTML = response['id'];
                } else {
                    document.getElementById("result").innerHTML = "Fail to get the tasks" + JSON.parse(requestd_data);
                }
            };
            xhttp.send(JSON.stringify(requestd_data));
        } catch (e) {
            document.getElementById("result").innerHTML = JSON.stringify(e);
        }
    }
}

function checkHandler() {
    browser.storage.local.get().then((d) => {
        if (d['handler'] != undefined) {
            handler = d['handler'];
            document.getElementById("handler").innerHTML = handler;
        }
    });
}

function checkTasks() {
    if (handler != null) {
        try {
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", API + "/tasks/index", true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var response = JSON.parse(this.responseText);
                    if (response['id'] != undefined) {
                        browser.storage.local.get().then((cached_data) => {
                            cached_data['tasks'] = response;
                            browser.storage.local.set(cached_data);
                        });
                    }
                    document.getElementById("result").innerHTML = response['id'];
                } else {
                    document.getElementById("result").innerHTML = "Fail to get the tasks" + this.status;
                }
            };
            var data = {"account_handler": handler};
            xhttp.send(JSON.stringify(data));
        } catch (e) {
            document.getElementById("result").innerHTML = JSON.stringify(e);
        }
    }
}

checkHandler();
checkTasks();

setInterval(() => {
    checkHandler();
    checkTasks();
}, 10000);

// function followAccount() {
//     console.log("Clicked");
//     // var ele=document.getElementsByClassName("css-1dbjc4n");
//     // ele[118].click();
//     // console.log(ele[118]);
// }
