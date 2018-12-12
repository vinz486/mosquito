package open.mind.mosquito.service;

import static java.lang.System.currentTimeMillis;
import static org.springframework.beans.factory.config.BeanDefinition.SCOPE_PROTOTYPE;

import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import open.mind.mosquito.model.Host;
import open.mind.mosquito.stomp.ClientStatus;
import open.mind.mosquito.stomp.HostStatus;


@Component
@Scope(SCOPE_PROTOTYPE)
public class StatusBroadcaster extends AbstractService
{

    @Value("${mosquito.register.prefix}")
    private String registerPrefix;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    private HostStatus hostStatus;

    private long lastBroadcast = currentTimeMillis();

    @PostConstruct
    public void init()
    {
        hostStatus = HostStatus.builder().build();
    }

    public void cast(Host hostData)
    {
        Map<String, ClientStatus> rendered = hostData.render(lastBroadcast);

        if (rendered.size() > 0)
        {
            hostStatus.setClients(rendered);
            simpMessagingTemplate.convertAndSend(registerPrefix + "/" + hostData.getId(), hostStatus);
            lastBroadcast = currentTimeMillis();
        }
    }
}
