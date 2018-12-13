var stompClient = null;
var host = window.location.hostname;


var getSockJS = function () {

  return new SockJS("/websocket");
};

var client = new StompJs.Client({

  webSocketFactory: getSockJS,
  connectHeaders: {
    login: "",
    passcode: ""
  },
  debug: function (str) {
    console.log(str);
  },
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000
});

stompClient = client;

$(document).ready(function () {

  console.log("Document ready");

  initStompClient();
  initMouseTrap();
});

function initStompClient() {

  stompClient.onConnect = function (frame) {

    fconnected(frame);

  };

  stompClient.activate();
}

function initMouseTrap() {

  $(document).mousemove(mouseTrap);
}

function mouseTrap(event) {

  console.log("Mouse move");
  sendClientEvent(event.pageX, event.pageY);
}

var fconnected = function (frame) {

  stompClient.subscribe('/client/' + host, function (hostStatus) {

    console.log("MSG: " + hostStatus);

    renderStatus(JSON.parse(hostStatus.body));
  });
}

function sendClientEvent(x, y) {

  stompClient.publish({
    destination: "/mosquito/event/" + host,
    body: JSON.stringify({'action': 'move', 'x': x, 'y': y})
  });
}

function renderStatus(hostStatus) {

  $.each(hostStatus.clients, function (clientId, event) {
    clientEvent(clientId, event);
  });
}
