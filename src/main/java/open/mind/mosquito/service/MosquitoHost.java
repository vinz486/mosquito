package open.mind.mosquito.service;

import static org.springframework.beans.factory.config.BeanDefinition.SCOPE_PROTOTYPE;

import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import open.mind.mosquito.model.Client;
import open.mind.mosquito.stomp.ClientEvent;
import open.mind.mosquito.stomp.HostStatus;


@Component
@Scope(SCOPE_PROTOTYPE)
public class MosquitoHost extends AbstractService
{

    @Autowired
    private StatusBroadcaster statusBroadcaster;

    private ConcurrentHashMap<String, Client> clientStatus = new ConcurrentHashMap<>();

    private final String hostId;

    public MosquitoHost(String host)
    {
        hostId = host;
    }

    public HostStatus init(String client)
    {
        return statusBroadcaster.getStatusFor(client, clientStatus);
    }

    public void event(String clientId, ClientEvent event)
    {

        Client client = clientStatus.computeIfAbsent(clientId, id -> Client.builder().id(id).build());

        updateClient(client, event);
    }

    private void updateClient(Client client, ClientEvent event)
    {
        client.lastEvent(event);
    }

    @Scheduled(fixedDelay = 100)
    public void broadcastHostStatus()
    {
        statusBroadcaster.cast(hostId, clientStatus);
    }

}