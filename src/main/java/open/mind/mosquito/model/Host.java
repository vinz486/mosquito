package open.mind.mosquito.model;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.apache.commons.lang3.StringUtils;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import lombok.Builder;
import lombok.Data;
import open.mind.mosquito.stomp.ClientStatus;


@Data
@Builder
public class Host
{
    private String id;

    @Builder.Default
    private ConcurrentHashMap<String, Client> clientStatus = new ConcurrentHashMap<>();

    public Client getClient(String clientId)
    {
        return clientStatus.computeIfAbsent(clientId, cId -> Client.builder().id(cId).build());
    }

    public void removeClient(String clientId)
    {
        clientStatus.remove(clientId);
    }

    public Map<String, ClientStatus> render(@NotNull Long lastBroadCast)
    {
        return render(lastBroadCast, null);
    }

    public Map<String, ClientStatus> render(@NotNull String clientId)
    {
        return render(null, clientId);
    }

    public Map<String, ClientStatus> render(@Nullable Long lastBroadCast, @Nullable String clientId)
    {
        Stream<Map.Entry<String, Client>> entryStream = clientStatus.entrySet().stream();

        if (lastBroadCast != null)
        {
            entryStream = entryStream.filter(filter(lastBroadCast));
        }

        if (clientId != null)
        {
            entryStream = entryStream.filter(filter(clientId));
        }

        return entryStream.collect(Collectors.toMap(Map.Entry::getKey, entry -> entry.getValue().getClientStatus()));
    }

    private Predicate<Map.Entry<String, Client>> filter(Long lastBroadCast)
    {
        return entry -> entry.getValue().getLastEvent() > lastBroadCast;
    }

    private Predicate<Map.Entry<String, Client>> filter(String clientId)
    {
        return entry -> !StringUtils.equals(entry.getValue().getId(), clientId);
    }
}
