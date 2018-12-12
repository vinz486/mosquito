package open.mind.mosquito.controller;

import static open.mind.mosquito.autoconfiguration.MosquitoConfiguration.DESTINATION_ADDRESS;
import static open.mind.mosquito.autoconfiguration.MosquitoConfiguration.HEADER_HOST;
import static open.mind.mosquito.autoconfiguration.WebSocketConfiguration.HEADER_SESSIONID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import open.mind.mosquito.service.MosquitoHostManager;
import open.mind.mosquito.stomp.ClientEvent;
import open.mind.mosquito.stomp.HostStatus;


@Controller
public class MosquitoController extends AbstractController
{

    @Autowired
    private MosquitoHostManager mosquitoHostManager;

    @RequestMapping("/")
    public String home(Model model)
    {
        return "mosquito";
    }

    @MessageMapping(DESTINATION_ADDRESS + "/{host}")
    public void event(@DestinationVariable("host") String host, @Header(HEADER_SESSIONID) String sessionId, ClientEvent event)
    {
        LOG.debug("Received event " + event);
        mosquitoHostManager.receive(host, sessionId, event);
    }

    @SubscribeMapping("{host}")
    public HostStatus init(@DestinationVariable("host") String host, StompHeaderAccessor headerAccessor)
    {
        String sessionId = headerAccessor.getSessionId();

        LOG.debug("Subscription from " + host + " id: " + sessionId);
        headerAccessor.getSessionAttributes().put(HEADER_HOST, host);

        return mosquitoHostManager.init(host, sessionId);
    }
}
