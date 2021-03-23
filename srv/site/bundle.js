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
    let emailAddress = document.getElementById('test').value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
        updateFooter("POST sent to server")
    }
    xhr.send(`email=${emailAddress}&subscribe=true`);
}

function updateFooter(message)
{
    footerText.innerText = message;
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
    updateFooter("Sending GET request...");

    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", parseInstances);
    xhr.open("GET", "/get/instances", true);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hd3Mtd2VicGFjay8uL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsYUFBYTtBQUNuQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUIiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHZpZXcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29uc29sZScpO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1YnNjcmliZScpLm9uY2xpY2sgPSBzdWJzY3JpYmU7XG5cbnZhciBmb290ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vdGVyJyk7XG52YXIgZm9vdGVyVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZXNzYWdlJyk7XG5cbmZ1bmN0aW9uIHN1YnNjcmliZSgpXG57XG4gICAgbGV0IGVtYWlsQWRkcmVzcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXN0JykudmFsdWU7XG5cbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeGhyLm9wZW4oXCJQT1NUXCIsICcvJywgdHJ1ZSk7XG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIik7XG5cbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHVwZGF0ZUZvb3RlcihcIlBPU1Qgc2VudCB0byBzZXJ2ZXJcIilcbiAgICB9XG4gICAgeGhyLnNlbmQoYGVtYWlsPSR7ZW1haWxBZGRyZXNzfSZzdWJzY3JpYmU9dHJ1ZWApO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVGb290ZXIobWVzc2FnZSlcbntcbiAgICBmb290ZXJUZXh0LmlubmVyVGV4dCA9IG1lc3NhZ2U7XG59XG5cbmZ1bmN0aW9uIHBhcnNlSW5zdGFuY2VzKClcbntcbiAgICBjb25zdCByZXNwb25zZSA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpO1xuICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblxuICAgIGNvbnN0IGluc3RhbmNlcyA9IHJlc3BvbnNlLlJlc2VydmF0aW9ucztcbiAgICB2YXIgc2VydmVyTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZXJ2ZXJsaXN0Jyk7XG4gICAgdmFyIHRpY2tlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aWNrZXInKTtcbiAgICBsZXQgYWN0aXZlQ291bnQgPSAwO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbnN0YW5jZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IGluc3RhbmNlID0gaW5zdGFuY2VzW2ldLkluc3RhbmNlc1swXTtcbiAgICAgICAgbGV0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBsZXQgdGVybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXG4gICAgICAgIGxldCBwdWJsaWNJUCA9IGluc3RhbmNlWydQdWJsaWNJcEFkZHJlc3MnXTtcbiAgICAgICAgbGV0IHN0YXRlID0gaW5zdGFuY2VbJ1N0YXRlJ11bJ05hbWUnXTtcblxuICAgICAgICB0ZXJtLmluc3RhbmNlID0gaW5zdGFuY2U7XG4gICAgICAgIHRlcm0uaW5uZXJUZXh0ID0gXCJUZXJtaW5hdGVcIjtcbiAgICAgICAgdGVybS5vbmNsaWNrID0gdGVybWluYXRlSW5zdGFuY2U7XG5cbiAgICAgICAgY29uc29sZS5sb2coaW5zdGFuY2UpO1xuXG4gICAgICAgIGl0ZW0uaW5uZXJUZXh0ID0gcHVibGljSVA7XG5cbiAgICAgICAgaWYgKHB1YmxpY0lQID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKHN0YXRlID09IFwidGVybWluYXRlZFwiKVxuICAgICAgICAgICAgICAgIGl0ZW0uaW5uZXJUZXh0ID0gXCJ6b21iaWVcIjtcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PSBcInN0b3BwZWRcIilcbiAgICAgICAgICAgICAgICBpdGVtLmlubmVyVGV4dCA9IFwic3RvcHBlZFwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbS5hcHBlbmRDaGlsZCh0ZXJtKTtcbiAgICAgICAgICAgIGFjdGl2ZUNvdW50Kys7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdGUgPT0gXCJzdG9wcGluZ1wiKVxuICAgICAgICAgICAgaXRlbS5zdHlsZS5jb2xvciA9ICcjNTk5OTk5JztcbiAgICAgICAgaWYgKHN0YXRlID09IFwic3RvcHBlZFwiKVxuICAgICAgICAgICAgaXRlbS5zdHlsZS5jb2xvciA9ICcjRjBGMDAwJztcbiAgICAgICAgaWYgKHN0YXRlID09IFwidGVybWluYXRlZFwiKVxuICAgICAgICAgICAgaXRlbS5zdHlsZS5jb2xvciA9ICcjRkYwMDAwJztcblxuICAgICAgICBzZXJ2ZXJMaXN0LmFwcGVuZENoaWxkKGl0ZW0pO1xuICAgIH1cbiAgICB0aWNrZXIuaW5uZXJUZXh0ID0gXCJ0b3RhbCBzZXJ2ZXJzIGFsbG9jYXRlZCBcIiArIFwiKFwiICsgYWN0aXZlQ291bnQgKyBcIi81KVwiO1xufVxuXG5mdW5jdGlvbiBwcm9iZUluc3RhbmNlcygpXG57XG4gICAgdXBkYXRlRm9vdGVyKFwiU2VuZGluZyBHRVQgcmVxdWVzdC4uLlwiKTtcblxuICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgcGFyc2VJbnN0YW5jZXMpO1xuICAgIHhoci5vcGVuKFwiR0VUXCIsIFwiL2dldC9pbnN0YW5jZXNcIiwgdHJ1ZSk7XG5cbiAgICB4aHIuc2VuZCgpO1xufVxuXG5mdW5jdGlvbiB0ZXJtaW5hdGVJbnN0YW5jZShlKVxue1xuICAgIGNvbnNvbGUubG9nKFwiVGVzdCFcIik7XG4gICAgY29uc29sZS5sb2coXCJUZXN0IGFnYWluMVwiKTtcbn1cblxucHJvYmVJbnN0YW5jZXMoKTsiXSwic291cmNlUm9vdCI6IiJ9