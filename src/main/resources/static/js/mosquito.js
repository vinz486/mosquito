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

stompClient  = client;

$(document).ready(function () {

  console.log("Document ready");

  initStompClient();
  initMouseTrap();
});

function initStompClient() {

  //stompClient = Stomp.over(function () {return new SockJS("/websocket")});
  //stompClient = Stomp.over(getSockJS);

  console.log("Connecting stomp");

  //stompClient.reconnect_delay = 3000;
  //stompClient.connect({}, stompConnect);

  stompClient.onConnect = function(frame){

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

var fconnected = function(frame) {

  console.log('AAAA: ' + frame);

  stompClient.subscribe('/client/' + host, function (hostStatus) {

    console.log("MSG: " + hostStatus);

    renderStatus(JSON.parse(hostStatus.body));
  });
}

function sendClientEvent(x, y) {

  stompClient.publish({
    destination: "/mosquito/event/" + host,
    body: JSON.stringify({'mouseX': x, 'mouseY': y})
  });
}

function renderStatus(hostStatus) {

  $.each(hostStatus.clients, function (client, position) {

    var $div = "div#c-" + client;

    if ($($div).length) {

      $($div).animate({top: position.mouseY, left: position.mouseX}, 50);

    } else {

      $("div#clients").append("<div id=\"c-" + client + "\"><img src='/img/cursor.png' width='12'><div>");
    }
  });
}
