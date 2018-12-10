package open.mind.mosquito.service;

import org.springframework.beans.factory.annotation.Lookup;
import org.springframework.stereotype.Component;

import open.mind.mosquito.stomp.ClientEvent;
import open.mind.mosquito.stomp.HostStatus;


@Component
public class MosquitoManager extends AbstractBeanContainer<String, MosquitoHost> {


    public void receive(String host, String client, ClientEvent event) {

        MosquitoHost mosquitoHost = get(host);

        mosquitoHost.event(client, event);
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
