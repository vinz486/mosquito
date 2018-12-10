package open.mind.mosquito.model;

import java.util.Date;

import lombok.Builder;
import lombok.Data;
import open.mind.mosquito.stomp.ClientEvent;
import open.mind.mosquito.stomp.ClientStatus;


@Data
@Builder
public class Client
{

    private String id;

    private Date lastEvent = new Date();

    private ClientStatus clientStatus;

    public void lastEvent(ClientEvent event)
    {
        clientStatus.setMouseX(event.getMouseX());
        clientStatus.setMouseY(event.getMouseY());

        lastEvent = new Date();
    }
}
