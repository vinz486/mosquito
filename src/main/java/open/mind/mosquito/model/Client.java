package open.mind.mosquito.model;

import static java.lang.System.currentTimeMillis;

import lombok.Builder;
import lombok.Data;
import open.mind.mosquito.stomp.ClientEvent;
import open.mind.mosquito.stomp.ClientStatus;


@Data
@Builder
public class Client
{

    private String id;

    @Builder.Default
    private long lastEvent = currentTimeMillis();

    @Builder.Default
    private ClientStatus clientStatus = new ClientStatus();

    public void lastEvent(ClientEvent event)
    {
        clientStatus.setMouseX(event.getMouseX());
        clientStatus.setMouseY(event.getMouseY());

        lastEvent = currentTimeMillis();
    }
}
