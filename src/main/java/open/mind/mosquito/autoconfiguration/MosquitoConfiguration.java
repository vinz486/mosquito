package open.mind.mosquito.autoconfiguration;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;


@Configuration
@EnableScheduling
public class MosquitoConfiguration
{

    public static final String HEADER_HOST = "mosquitoHost";

    public static final String DESTINATION_ADDRESS = "/event";

}
