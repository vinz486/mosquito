package open.mind.mosquito.autoconfiguration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;


@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer
{

    public static final String HEADER_SESSIONID = "simpSessionId";

    public static final String HEADER_ATTRIBUTES = "simpSessionAttributes";

    @Value("${mosquito.register.prefix}")
    private String registerPrefix;

    @Value("${mosquito.destination.prefix}")
    private String destinationPrefix;

    @Value("${mosquito.websocket.address}")
    private String websocketAddress;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config)
    {
        config.enableSimpleBroker(registerPrefix);
        config.setApplicationDestinationPrefixes(destinationPrefix, registerPrefix);
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry)
    {
        registry.addEndpoint(websocketAddress).setAllowedOrigins("*").withSockJS();
    }
}
