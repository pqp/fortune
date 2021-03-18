/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
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
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hd3Mtd2VicGFjay8uL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGFBQWE7QUFDbkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciB2aWV3ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnNvbGUnKTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJzY3JpYmUnKS5vbmNsaWNrID0gc3Vic2NyaWJlO1xuXG5mdW5jdGlvbiBzdWJzY3JpYmUoKVxue1xuICAgIGxldCBlbWFpbEFkZHJlc3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVzdCcpLnZhbHVlO1xuXG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhoci5vcGVuKFwiUE9TVFwiLCAnLycsIHRydWUpO1xuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpO1xuXG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlBPU1QgRmluaXNoZWRcIik7XG4gICAgfVxuICAgIHhoci5zZW5kKGBlbWFpbD0ke2VtYWlsQWRkcmVzc30mc3Vic2NyaWJlPXRydWVgKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VJbnN0YW5jZXMoKVxue1xuICAgIGNvbnN0IHJlc3BvbnNlID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCk7XG4gICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuXG4gICAgY29uc3QgaW5zdGFuY2VzID0gcmVzcG9uc2UuUmVzZXJ2YXRpb25zO1xuICAgIHZhciBzZXJ2ZXJMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlcnZlcmxpc3QnKTtcbiAgICB2YXIgdGlja2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpY2tlcicpO1xuICAgIGxldCBhY3RpdmVDb3VudCA9IDA7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluc3RhbmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgaW5zdGFuY2UgPSBpbnN0YW5jZXNbaV0uSW5zdGFuY2VzWzBdO1xuICAgICAgICBsZXQgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIGxldCB0ZXJtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cbiAgICAgICAgbGV0IHB1YmxpY0lQID0gaW5zdGFuY2VbJ1B1YmxpY0lwQWRkcmVzcyddO1xuICAgICAgICBsZXQgc3RhdGUgPSBpbnN0YW5jZVsnU3RhdGUnXVsnTmFtZSddO1xuXG4gICAgICAgIHRlcm0uaW5zdGFuY2UgPSBpbnN0YW5jZTtcbiAgICAgICAgdGVybS5pbm5lclRleHQgPSBcIlRlcm1pbmF0ZVwiO1xuICAgICAgICB0ZXJtLm9uY2xpY2sgPSB0ZXJtaW5hdGVJbnN0YW5jZTtcblxuICAgICAgICBjb25zb2xlLmxvZyhpbnN0YW5jZSk7XG5cbiAgICAgICAgaXRlbS5pbm5lclRleHQgPSBwdWJsaWNJUDtcblxuICAgICAgICBpZiAocHVibGljSVAgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoc3RhdGUgPT0gXCJ0ZXJtaW5hdGVkXCIpXG4gICAgICAgICAgICAgICAgaXRlbS5pbm5lclRleHQgPSBcInpvbWJpZVwiO1xuICAgICAgICAgICAgaWYgKHN0YXRlID09IFwic3RvcHBlZFwiKVxuICAgICAgICAgICAgICAgIGl0ZW0uaW5uZXJUZXh0ID0gXCJzdG9wcGVkXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtLmFwcGVuZENoaWxkKHRlcm0pO1xuICAgICAgICAgICAgYWN0aXZlQ291bnQrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZSA9PSBcInN0b3BwaW5nXCIpXG4gICAgICAgICAgICBpdGVtLnN0eWxlLmNvbG9yID0gJyM1OTk5OTknO1xuICAgICAgICBpZiAoc3RhdGUgPT0gXCJzdG9wcGVkXCIpXG4gICAgICAgICAgICBpdGVtLnN0eWxlLmNvbG9yID0gJyNGMEYwMDAnO1xuICAgICAgICBpZiAoc3RhdGUgPT0gXCJ0ZXJtaW5hdGVkXCIpXG4gICAgICAgICAgICBpdGVtLnN0eWxlLmNvbG9yID0gJyNGRjAwMDAnO1xuXG4gICAgICAgIHNlcnZlckxpc3QuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgfVxuICAgIHRpY2tlci5pbm5lclRleHQgPSBcInRvdGFsIHNlcnZlcnMgYWxsb2NhdGVkIFwiICsgXCIoXCIgKyBhY3RpdmVDb3VudCArIFwiLzUpXCI7XG59XG5cbmZ1bmN0aW9uIHByb2JlSW5zdGFuY2VzKClcbntcbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIHBhcnNlSW5zdGFuY2VzKTtcbiAgICB4aHIub3BlbihcIkdFVFwiLCBcIi9hd3NkYXRhXCIsIHRydWUpO1xuXG4gICAgeGhyLnNlbmQoKTtcbn1cblxuZnVuY3Rpb24gdGVybWluYXRlSW5zdGFuY2UoZSlcbntcbiAgICBjb25zb2xlLmxvZyhcIlRlc3QhXCIpO1xuICAgIGNvbnNvbGUubG9nKFwiVGVzdCBhZ2FpbjFcIik7XG59XG5cbnByb2JlSW5zdGFuY2VzKCk7Il0sInNvdXJjZVJvb3QiOiIifQ==