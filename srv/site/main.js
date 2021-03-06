var view = document.getElementById('console');
document.getElementById('subscribe').onclick = subscribe;

var footer = document.getElementById('footer');
var footerText = document.getElementById('message');

function subscribe()
{
    let emailAddress = document.getElementById('email').value;
    console.log(emailAddress);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", `/subscribe/email/${emailAddress}`, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
        updateFooter("POST sent to server")
    }
    xhr.send();
}

function updateFooter(message)
{
    footerText.innerText = message;
}

// Build out the list of instances hosting the site
function parseInstances()
{
    const response = JSON.parse(this.responseText);
    console.log(response);

    const instances = response.Reservations;
    var serverList = document.getElementById('serverlist');
    var ticker = document.getElementById('ticker');
    let activeCount = 0;

    for (var i = 0; i < instances.length; i++) {
        let instance = instances[i].Instances[0];
        let item = document.createElement('li');
        let term = document.createElement('button');

        let publicIP = instance['PublicIpAddress'];
        let state = instance['State']['Name'];

        term.instance = instance;
        term.innerText = "Terminate";
        term.onclick = terminateInstance;

        console.log(instance);

        item.innerText = publicIP;

        if (publicIP == undefined) {
            if (state == "terminated")
                item.innerText = "zombie";
            if (state == "stopped")
                item.innerText = "stopped";
        } else {
            item.appendChild(term);
            activeCount++;
        }

        if (state == "stopping")
            item.style.color = '#599999';
        if (state == "stopped")
            item.style.color = '#F0F000';
        if (state == "terminated")
            item.style.color = '#FF0000';

        serverList.appendChild(item);
    }
    ticker.innerText = "total servers allocated " + "(" + activeCount + "/5)";
}

function probeInstances()
{
    updateFooter("Sending GET request...");

    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", parseInstances);
    xhr.open("GET", "/get/instances", true);

    xhr.send();
}

function spliceTTY()
{
    var one = /https?\:\/\/[^\" ]+/i.exec(this.responseText);
    var urla = /^(.*)$/m.exec(one[0]);

    let iFrame = document.getElementById('consoleView');
    iFrame.setAttribute('src', urla[0]);
}

function getTTY()
{
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", spliceTTY);
    xhr.open("GET", "/get/tty", true);

    xhr.send();
}

function terminateInstance(e)
{
    console.log("Test!");
    console.log("Test again1");
}

probeInstances();
getTTY();