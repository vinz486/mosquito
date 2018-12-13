package open.mind.mosquito.service;

import org.springframework.stereotype.Component;

import open.mind.mosquito.model.Client;
import open.mind.mosquito.stomp.ClientEvent;
import open.mind.mosquito.stomp.ClientStatus;


@Component
public class ClientManager extends AbstractService
{
    public void event(Client client, ClientEvent event)
    {

        switch (event.getAction())
        {
            case "move":

                ClientStatus.Position position = ClientStatus.Position.builder().x(event.getX()).y(event.getY()).build();
                client.setClientStatus(ClientStatus.builder().position(position).event(event.getAction()).build());

                client.ping();

                break;
        }
    }
}
