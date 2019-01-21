package open.mind.mosquito.stomp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import open.mind.jspoet.api.JsPoem;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@JsPoem
public class ClientStatus
{
    private String event;

    private Position position;

    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    @ToString
    public static class Position
    {
        private String x;

        private String y;
    }
}
