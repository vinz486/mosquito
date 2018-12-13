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

    public static class Position
    {
        private String x;

        private String y;
    }

    public void ping()
    {
        lastEvent = currentTimeMillis();
    }
}
