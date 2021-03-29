/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
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
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hd3Mtd2VicGFjay8uL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5Q0FBeUMsYUFBYTtBQUN0RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciB2aWV3ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnNvbGUnKTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJzY3JpYmUnKS5vbmNsaWNrID0gc3Vic2NyaWJlO1xuXG52YXIgZm9vdGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvb3RlcicpO1xudmFyIGZvb3RlclRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVzc2FnZScpO1xuXG5mdW5jdGlvbiBzdWJzY3JpYmUoKVxue1xuICAgIGxldCBlbWFpbEFkZHJlc3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW1haWwnKS52YWx1ZTtcbiAgICBjb25zb2xlLmxvZyhlbWFpbEFkZHJlc3MpO1xuXG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhoci5vcGVuKFwiUE9TVFwiLCBgL3N1YnNjcmliZS9lbWFpbC8ke2VtYWlsQWRkcmVzc31gLCB0cnVlKTtcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiKTtcblxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdXBkYXRlRm9vdGVyKFwiUE9TVCBzZW50IHRvIHNlcnZlclwiKVxuICAgIH1cbiAgICB4aHIuc2VuZCgpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVGb290ZXIobWVzc2FnZSlcbntcbiAgICBmb290ZXJUZXh0LmlubmVyVGV4dCA9IG1lc3NhZ2U7XG59XG5cbi8vIEJ1aWxkIG91dCB0aGUgbGlzdCBvZiBpbnN0YW5jZXMgaG9zdGluZyB0aGUgc2l0ZVxuZnVuY3Rpb24gcGFyc2VJbnN0YW5jZXMoKVxue1xuICAgIGNvbnN0IHJlc3BvbnNlID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCk7XG4gICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuXG4gICAgY29uc3QgaW5zdGFuY2VzID0gcmVzcG9uc2UuUmVzZXJ2YXRpb25zO1xuICAgIHZhciBzZXJ2ZXJMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlcnZlcmxpc3QnKTtcbiAgICB2YXIgdGlja2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpY2tlcicpO1xuICAgIGxldCBhY3RpdmVDb3VudCA9IDA7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluc3RhbmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgaW5zdGFuY2UgPSBpbnN0YW5jZXNbaV0uSW5zdGFuY2VzWzBdO1xuICAgICAgICBsZXQgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIGxldCB0ZXJtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cbiAgICAgICAgbGV0IHB1YmxpY0lQID0gaW5zdGFuY2VbJ1B1YmxpY0lwQWRkcmVzcyddO1xuICAgICAgICBsZXQgc3RhdGUgPSBpbnN0YW5jZVsnU3RhdGUnXVsnTmFtZSddO1xuXG4gICAgICAgIHRlcm0uaW5zdGFuY2UgPSBpbnN0YW5jZTtcbiAgICAgICAgdGVybS5pbm5lclRleHQgPSBcIlRlcm1pbmF0ZVwiO1xuICAgICAgICB0ZXJtLm9uY2xpY2sgPSB0ZXJtaW5hdGVJbnN0YW5jZTtcblxuICAgICAgICBjb25zb2xlLmxvZyhpbnN0YW5jZSk7XG5cbiAgICAgICAgaXRlbS5pbm5lclRleHQgPSBwdWJsaWNJUDtcblxuICAgICAgICBpZiAocHVibGljSVAgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoc3RhdGUgPT0gXCJ0ZXJtaW5hdGVkXCIpXG4gICAgICAgICAgICAgICAgaXRlbS5pbm5lclRleHQgPSBcInpvbWJpZVwiO1xuICAgICAgICAgICAgaWYgKHN0YXRlID09IFwic3RvcHBlZFwiKVxuICAgICAgICAgICAgICAgIGl0ZW0uaW5uZXJUZXh0ID0gXCJzdG9wcGVkXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtLmFwcGVuZENoaWxkKHRlcm0pO1xuICAgICAgICAgICAgYWN0aXZlQ291bnQrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZSA9PSBcInN0b3BwaW5nXCIpXG4gICAgICAgICAgICBpdGVtLnN0eWxlLmNvbG9yID0gJyM1OTk5OTknO1xuICAgICAgICBpZiAoc3RhdGUgPT0gXCJzdG9wcGVkXCIpXG4gICAgICAgICAgICBpdGVtLnN0eWxlLmNvbG9yID0gJyNGMEYwMDAnO1xuICAgICAgICBpZiAoc3RhdGUgPT0gXCJ0ZXJtaW5hdGVkXCIpXG4gICAgICAgICAgICBpdGVtLnN0eWxlLmNvbG9yID0gJyNGRjAwMDAnO1xuXG4gICAgICAgIHNlcnZlckxpc3QuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgfVxuICAgIHRpY2tlci5pbm5lclRleHQgPSBcInRvdGFsIHNlcnZlcnMgYWxsb2NhdGVkIFwiICsgXCIoXCIgKyBhY3RpdmVDb3VudCArIFwiLzUpXCI7XG59XG5cbmZ1bmN0aW9uIHByb2JlSW5zdGFuY2VzKClcbntcbiAgICB1cGRhdGVGb290ZXIoXCJTZW5kaW5nIEdFVCByZXF1ZXN0Li4uXCIpO1xuXG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhoci5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBwYXJzZUluc3RhbmNlcyk7XG4gICAgeGhyLm9wZW4oXCJHRVRcIiwgXCIvZ2V0L2luc3RhbmNlc1wiLCB0cnVlKTtcblxuICAgIHhoci5zZW5kKCk7XG59XG5cbmZ1bmN0aW9uIHNwbGljZVRUWSgpXG57XG4gICAgdmFyIG9uZSA9IC9odHRwcz9cXDpcXC9cXC9bXlxcXCIgXSsvaS5leGVjKHRoaXMucmVzcG9uc2VUZXh0KTtcbiAgICB2YXIgdXJsYSA9IC9eKC4qKSQvbS5leGVjKG9uZVswXSk7XG5cbiAgICBsZXQgaUZyYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnNvbGVWaWV3Jyk7XG4gICAgaUZyYW1lLnNldEF0dHJpYnV0ZSgnc3JjJywgdXJsYVswXSk7XG59XG5cbmZ1bmN0aW9uIGdldFRUWSgpXG57XG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhoci5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBzcGxpY2VUVFkpO1xuICAgIHhoci5vcGVuKFwiR0VUXCIsIFwiL2dldC90dHlcIiwgdHJ1ZSk7XG5cbiAgICB4aHIuc2VuZCgpO1xufVxuXG5mdW5jdGlvbiB0ZXJtaW5hdGVJbnN0YW5jZShlKVxue1xuICAgIGNvbnNvbGUubG9nKFwiVGVzdCFcIik7XG4gICAgY29uc29sZS5sb2coXCJUZXN0IGFnYWluMVwiKTtcbn1cblxucHJvYmVJbnN0YW5jZXMoKTtcbmdldFRUWSgpOyJdLCJzb3VyY2VSb290IjoiIn0=