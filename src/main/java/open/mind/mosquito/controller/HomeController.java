package open.mind.mosquito.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import open.mind.mosquito.service.MosquitoManager;
import open.mind.mosquito.stomp.ClientEvent;
import open.mind.mosquito.stomp.HostStatus;


@Controller
public class HomeController extends AbstractController
{

    @Autowired
    private MosquitoManager mosquitoManager;

    @RequestMapping("/")
    public String home(Model model)
    {
        return "mosquito";
    }

    @MessageMapping("/event/{host}")
    @SendTo("/client/{host}")
    public HostStatus event(@DestinationVariable("host") String host, SimpMessageHeaderAccessor headerAccessor, ClientEvent event)
    {
        LOG.info("Received event " + event);
        return mosquitoManager.receive(host, headerAccessor.getSessionId(), event);
    }

    @SubscribeMapping("/client/{host}")
    public HostStatus init(@DestinationVariable("host") String host)
    {
        LOG.info("Subscription from " + host);
        return mosquitoManager.init(host);
    }
}
