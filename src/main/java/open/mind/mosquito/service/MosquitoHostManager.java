package open.mind.mosquito.service;

import org.springframework.beans.factory.annotation.Lookup;
import org.springframework.stereotype.Component;

import open.mind.mosquito.stomp.ClientEvent;
import open.mind.mosquito.stomp.HostStatus;


@Component
public class MosquitoHostManager extends AbstractBeanContainer<String, MosquitoHost>
{
    public HostStatus init(String hostId, String clientId)
    {
        MosquitoHost mosquitoHost = get(hostId);

        return mosquitoHost.init(clientId);
    }

    public void receive(String hostId, String clientId, ClientEvent event)
    {
        MosquitoHost mosquitoHost = get(hostId);

        mosquitoHost.event(clientId, event);
    }


    public void disconnect(String hostId, String clientId)
    {
        MosquitoHost mosquitoHost = get(hostId);

        mosquitoHost.remove(clientId);
    }

    @Override
    protected MosquitoHost create(String hostId)
    {

        return getBean(hostId);
    }

    @Lookup
    protected MosquitoHost getBean(String host)
    {
        return null;
    }

}
