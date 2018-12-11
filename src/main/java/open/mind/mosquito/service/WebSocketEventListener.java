package open.mind.mosquito.service;

import static open.mind.mosquito.autoconfiguration.MosquitoConfiguration.HEADER_HOST;
import static open.mind.mosquito.autoconfiguration.WebSocketConfiguration.HEADER_SESSIONID;
import static org.apache.commons.lang3.StringUtils.isEmpty;
import static org.apache.commons.lang3.StringUtils.isNotEmpty;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;


@Component
public class WebSocketEventListener extends AbstractService
{

    @Autowired
    private MosquitoHostManager mosquitoHostManager;

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event)
    {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        Map<String, Object> attributes = headerAccessor.getSessionAttributes();

        if (attributes == null)
        {
            return;
        }

        String host = (String) attributes.get(HEADER_HOST);

        if (isEmpty(host))
        {
            return;
        }

        String client = (String) headerAccessor.getMessageHeaders().get(HEADER_SESSIONID);

        if (isNotEmpty(client))
        {
            mosquitoHostManager.disconnect(host, client);
        }
    }
}
