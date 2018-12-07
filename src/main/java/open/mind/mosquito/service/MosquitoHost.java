package open.mind.mosquito.service;

import open.mind.mosquito.stomp.ClientEvent;
import open.mind.mosquito.stomp.ClientStatus;
import open.mind.mosquito.stomp.HostStatus;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;

import static org.springframework.beans.factory.config.BeanDefinition.SCOPE_PROTOTYPE;

@Component
@Scope(SCOPE_PROTOTYPE)
public class MosquitoHost {

    private ConcurrentHashMap<String, ClientStatus> hostStatus = new ConcurrentHashMap<>();

    public MosquitoHost(String host)
    {
    }

    public HostStatus event(String client, ClientEvent event)
    {

        ClientStatus clientStatus = hostStatus.computeIfAbsent(client, s -> {

            ClientStatus.ClientStatusBuilder builder = ClientStatus.builder();

            builder.mouseX(event.getMouseX());
            builder.mouseY(event.getMouseY());

            builder.type(event.getType());

            return builder.build();
        });

        clientStatus.setMouseX(event.getMouseX());
        clientStatus.setMouseY(event.getMouseY());
        clientStatus.setType(event.getType());

        return renderHostStatus();
    }

    private HostStatus renderHostStatus() {

        return HostStatus.builder().clients(new HashMap<>(hostStatus)).build();
    }
}
