var clients          = {};
var CURSOR_CONTAINER = 'div#clients';
var _cursor          = '<img id="client-%ID%" alt="client" class="cursor" src="/img/cursor.svg">';

function addCursor(clientId)
{
  $(CURSOR_CONTAINER).append(_cursor.replace("%ID%", clientId));
}

function removeClient(clientId)
{
  $("#client-" + clientId).remove();
  delete clients[clientId];
}

function addClient(clientId, position)
{
  clients[clientId] = position;
  addCursor(clientId);
  moveClient(clientId, position);
}

function moveClient(clientId, position)
{
  var mapped = remap(position);

  if (clientId in clients)
  {
    $("#client-" + clientId).animate({top: mapped.y, left: mapped.x}, 50);

  } else {

    addClient(clientId, position);
  }
}

function clientEvent(clientId, event)
{
  switch (event.event) {

    case 'move':
      moveClient(clientId, event.position);
      break;
  }
}

function remap(position)
{

  //TODO transpose

  var remapped = {
    x: position.x,
    y: position.y
  };

  return remapped;
}
