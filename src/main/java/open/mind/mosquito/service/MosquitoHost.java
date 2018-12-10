package open.mind.mosquito.service;

import static org.springframework.beans.factory.config.BeanDefinition.SCOPE_PROTOTYPE;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.BiConsumer;
import java.util.function.BinaryOperator;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.Supplier;
import java.util.stream.Collector;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import open.mind.mosquito.model.Client;
import open.mind.mosquito.stomp.ClientEvent;
import open.mind.mosquito.stomp.ClientStatus;
import open.mind.mosquito.stomp.HostStatus;


@Component
@Scope(SCOPE_PROTOTYPE)
public class MosquitoHost
{

    private ConcurrentHashMap<String, Client> hostStatus = new ConcurrentHashMap<>();

    public MosquitoHost(String host)
    {
    }

    public HostStatus event(String clientId, ClientEvent event)
    {

        Client client = hostStatus.computeIfAbsent(clientId, id -> Client.builder().id(id).build());

        updateClient(client, event);

        return renderHostStatus(clientId);
    }

    private HostStatus renderHostStatus(String clientId)
    {

        hostStatus.entrySet().stream().filter(new Predicate<Map.Entry<String, Client>>()
        {
            @Override
            public boolean test(Map.Entry<String, Client> stringClientEntry)
            {
                return !stringClientEntry.getValue().getId().equals(clientId);
            }
        });

        return null;
        //return HostStatus.builder().clients(new HashMap<>(hostStatus.entrySet())).build();
    }

    private void updateClient(Client client, ClientEvent event)
    {
        client.lastEvent(event);
    }
}