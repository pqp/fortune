var view = document.getElementById('console');
document.getElementById('subscribe').onclick = subscribe;

function subscribe()
{
    let emailAddress = document.getElementById('test').value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
        console.log("POST Finished");
    }
    xhr.send(`email=${emailAddress}&subscribe=true`);
}

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
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", parseInstances);
    xhr.open("GET", "/awsdata", true);

    xhr.send();
}

function terminateInstance(e)
{
    console.log("Test!");
    console.log("Test again1");
}

probeInstances();