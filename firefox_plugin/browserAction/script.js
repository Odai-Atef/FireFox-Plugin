var API = "http://35.159.18.195/api";
var handler = null;

browser.storage.onChanged.addListener(newEvent);
var number_of_requests = 0;

//functions
function newEvent(data) {
    if (data.event.newValue == "EVENT_HANDLER_FETCHED") {
        checkHandler(data);
        checkTasks();
    }
    if (data.event.newValue == "EVENT_TASK_DONE") {
        checkDone(data);
    }
}

function checkDone(data) {

    try {
        var xhttp = new XMLHttpRequest();
        var requestd_data = {"account_handler": handler, "id": data.tasks.newValue.id};
        xhttp.open("POST", API + "/tasks/executed", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(this.responseText);
                document.getElementById("result").innerHTML = "Fail to get the tasks" + this.responseText;
                if (response['status'] != undefined && response['status'] == "1") {
                    browser.storage.local.get().then((cached_data) => {
                        delete cached_data['tasks'];
                        cached_data['event']="EVENT_HANDLER_FETCHED";
                        browser.storage.local.set(cached_data);
                    });
                }
                document.getElementById("result").innerHTML = response['id'];
            } else {
                document.getElementById("result").innerHTML = "Fail to get the tasks" + JSON.stringify(requestd_data);
            }
        };
        xhttp.send(JSON.stringify(requestd_data));
    } catch (e) {
        document.getElementById("result").innerHTML = JSON.stringify(e);
    }

}

function checkHandler(data) {
    handler = data.handler.newValue;
    document.getElementById("handler").innerHTML = "@" + handler;
}

function checkTasks() {
    if (handler != null) {
        try {
            number_of_requests = number_of_requests + 1;
            document.getElementById("requests").innerHTML = "" + number_of_requests;
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", API + "/tasks/index", true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var response = JSON.parse(this.responseText);
                    if (response['id'] != undefined) {
                        browser.storage.local.get().then((cached_data) => {
                            cached_data['tasks'] = response;
                            cached_data['event'] = "EVENT_TASK_READY";
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


