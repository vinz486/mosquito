package open.mind.mosquito.stomp;

import lombok.*;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ClientStatus
{
    private String type;

    private String mouseX;
    private String mouseY;
}
