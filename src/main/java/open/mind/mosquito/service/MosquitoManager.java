package open.mind.mosquito.service;

import open.mind.mosquito.stomp.ClientEvent;
import open.mind.mosquito.stomp.HostStatus;
import org.springframework.beans.factory.annotation.Lookup;
import org.springframework.stereotype.Component;


@Component
public class MosquitoManager extends AbstractBeanContainer<String, MosquitoHost> {


    public HostStatus receive(String host, String client, ClientEvent event) {

        MosquitoHost mosquitoHost = get(host);

        return mosquitoHost.event(client, event);
    }

    public HostStatus init(String host) {

        return null;
    }

    @Override
    protected MosquitoHost create(String host) {

        return getBean(host);
    }

    @Lookup
    protected MosquitoHost getBean(String host) {
        return null;
    }
}
