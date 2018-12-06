
var stompClient = null;
var host  = window.location.hostname;

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

  console.log("Message " + message);

  $("#debug").append(message.mouseX + " " + message.mouseY + " ");

  $("#target").animate({
    left: message.mouseX,
    top: message.mouseY
  }, 10)
}

$(function () {

  $("form").on('submit', function (e) {
    e.preventDefault();
  });

  $("#connect").click(function () {
    initStompClient();
  });

  $("#disconnect").click(function () {
    disconnect();
  });

  $("#send").click(function () {
    sendName();
  });

});