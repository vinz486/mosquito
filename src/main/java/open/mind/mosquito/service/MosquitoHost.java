package open.mind.mosquito.service;

import static org.springframework.beans.factory.config.BeanDefinition.SCOPE_PROTOTYPE;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import open.mind.mosquito.model.Client;
import open.mind.mosquito.model.Host;
import open.mind.mosquito.stomp.ClientEvent;
import open.mind.mosquito.stomp.HostStatus;


@Component
@Scope(SCOPE_PROTOTYPE)
public class MosquitoHost extends AbstractService
{

    @Autowired
    private StatusBroadcaster statusBroadcaster;

    private Host hostData;

    public MosquitoHost(String hostId)
    {
        hostData = Host.builder().id(hostId).build();
    }

    public HostStatus init(String clientId)
    {
        return HostStatus.builder().clients(hostData.render(clientId)).build();
    }

    public void event(String clientId, ClientEvent event)
    {
        Client client = hostData.getClient(clientId);

        updateClient(client, event);
    }

    private void updateClient(Client client, ClientEvent event)
    {
        client.lastEvent(event);
    }

    public void remove(String clientId)
    {
        hostData.removeClient(clientId);
    }

    @Scheduled(fixedDelayString = "${mosquito.broadcast.delayMillis}")
    public void broadcastHostStatus()
    {
        statusBroadcaster.cast(hostData);
    }
}