var stompClient = null;
var host = window.location.hostname;

$(document).ready(function () {

    console.log("Document ready");

    initStompClient();
    initMouseTrap();
});

function initStompClient() {

    //stompClient = Stomp.over(function () {return new SockJS("/websocket")});
    stompClient = Stomp.over(new SockJS("/websocket"));

    console.log("Connecting stomp");

    stompClient.reconnect_delay = 3000;
    stompClient.connect({}, stompConnect);
}


function initMouseTrap() {

    $(document).mousemove(mouseTrap);
}

function mouseTrap(event) {

    console.log("Mouse move");
    sendClientEvent(event.pageX, event.pageY);
}

function setConnected(connected) {

    console.log("Stomp connected");

    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);

    if (connected) {

        $("#conversation").show();

    } else {

        $("#conversation").hide();
    }

    $("#greetings").html("");
}

function stompConnect(frame) {

    setConnected(true);

    console.log('Connected: ' + frame);

    stompClient.subscribe('/client/' + host, function (greeting) {

        showGreeting(JSON.parse(greeting.body));

    });
}

function disconnect() {

    if (stompClient !== null) {
        stompClient.disconnect();
    }

    setConnected(false);

    console.log("Disconnected");
}

function sendName() {

    stompClient.send("/mosquito/event/" + host, {}, JSON.stringify({'ping': $("#name").val()}));
}

function sendClientEvent(x, y) {

    stompClient.send("/mosquito/event/" + host, {}, JSON.stringify({'mouseX': x, 'mouseY': y}));
}

function showGreeting(message) {

    $.each(message.clients, function (client, position) {

        var $div = "div#c-" + client;

        if ($($div).length) {

            $($div).animate({top: position.mouseY, left: position.mouseX}, 10);

        } else {

            $("div#clients").append("<div id=\"c-" + client + "\">" + client + "<div>");
                $($div).css("position", "absolute");
            $($div).css("top", position.mouseY + "px");
            $($div).css("left", position.mouseX + "px");

        }
    });
}
