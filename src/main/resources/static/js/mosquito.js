var stompClient = null;
var host = window.location.hostname;

function getSockJS() {

  return new SockJS("/websocket");
}

/*
var stompConfig: StompConfig = {
  // Which server?
  url: getSockJS,

  // Headers
  // Typical keys: login, passcode, host
  headers: {
    login: 'guest',
    passcode: 'guest'
  },

  // How frequent is the heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeat_in: 0, // Typical value 0 - disabled
  heartbeat_out: 20000, // Typical value 20000 - every 20 seconds

  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 5000 (5 seconds)
  reconnect_delay: 5000,

  // Will log diagnostics on console
  debug: true
};
*/
$(document).ready(function () {

  console.log("Document ready");

  initStompClient();
  initMouseTrap();
});

function initStompClient() {

  //stompClient = Stomp.over(function () {return new SockJS("/websocket")});
  stompClient = Stomp.over(getSockJS());

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

function stompConnect(frame) {

  console.log('Connected: ' + frame);

  stompClient.subscribe('/client/' + host, function (hostStatus) {

    renderStatus(JSON.parse(hostStatus.body));
  });
}

function sendClientEvent(x, y) {

  stompClient.send("/mosquito/event/" + host, {}, JSON.stringify({'mouseX': x, 'mouseY': y}));
}

function renderStatus(hostStatus) {

  $.each(hostStatus.clients, function (client, position) {

    var $div = "div#c-" + client;

    if ($($div).length) {

      $($div).animate({top: position.mouseY, left: position.mouseX}, 50);

    } else {

      $("div#clients").append("<div id=\"c-" + client + "\">X<div>");
    }
  });
}
