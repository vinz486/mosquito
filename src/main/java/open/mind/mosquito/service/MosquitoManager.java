package open.mind.mosquito.service;

import org.springframework.stereotype.Component;

import open.mind.mosquito.stomp.ClientEvent;
import open.mind.mosquito.stomp.HostStatus;


@Component
public class MosquitoManager
{

    public HostStatus receive(String host, ClientEvent event)
    {
        return HostStatus.builder().mouseX(event.getMouseX()).mouseY(event.getMouseY()).build();
    }

    public HostStatus init(String host)
    {
        return null;
    }
}
