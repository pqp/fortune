import { EC2, paginateDescribeReservedInstancesModifications } from "@aws-sdk/client-ec2";

var view = document.getElementById('console');

var response = AWS.getConsoleOutput(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else     console.log(data);

    view.innerText = atob(data.Output);
    view.scrollTop = view.scrollHeight;
});

function terminateInstance(e)
{
    console.log("hi");
}

function parseInstances(data)
{
    const instances = data.Reservations;
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
            item.style.color = '#600000';
        if (state == "stopped")
            item.style.color = '#F0F000';
        if (state == "terminated")
            item.style.color = '#FF0000';

        serverList.appendChild(item);
    }
    ticker.innerText = "total servers allocated " + "(" + activeCount + "/5)";
}

function onDescribe(err, data)
{
    if (err) console.log(err, err.stack);
    else     parseInstances(data);
}

AWS.describeInstances(params, onDescribe);
