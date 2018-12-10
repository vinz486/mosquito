package open.mind.mosquito.service;

import static java.lang.System.currentTimeMillis;
import static org.springframework.beans.factory.config.BeanDefinition.SCOPE_PROTOTYPE;

import java.util.Date;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import open.mind.mosquito.model.Client;
import open.mind.mosquito.stomp.ClientStatus;
import open.mind.mosquito.stomp.HostStatus;


@Component
@Scope(SCOPE_PROTOTYPE)
public class StatusBroadcaster extends AbstractService
{

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    private HostStatus hostStatus;

    private long lastBroadcast = currentTimeMillis();

    @PostConstruct
    public void init()
    {
        hostStatus = HostStatus.builder().build();
    }

    public void cast(String hostId, ConcurrentHashMap<String, Client> clientStatus)
    {

        Map<String, ClientStatus> rendered = render(clientStatus);

        if (rendered.size() > 0)
        {
            hostStatus.setClients(rendered);
            simpMessagingTemplate.convertAndSend("/client/" + hostId, hostStatus);
            lastBroadcast = currentTimeMillis();
        }
    }

    private Map<String, ClientStatus> render(ConcurrentHashMap<String, Client> clientStatus)
    {

        return clientStatus.entrySet().stream().filter(entry -> entry.getValue().getLastEvent() > lastBroadcast)
                .collect(Collectors.toMap(Map.Entry::getKey, client -> client.getValue().getClientStatus()));
    }
}
