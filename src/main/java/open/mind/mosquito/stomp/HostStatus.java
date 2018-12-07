package open.mind.mosquito.stomp;

import lombok.*;

import java.util.HashMap;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class HostStatus
{
    private HashMap<String, ClientStatus> clients;
}