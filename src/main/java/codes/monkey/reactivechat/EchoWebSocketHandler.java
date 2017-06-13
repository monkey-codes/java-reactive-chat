package codes.monkey.reactivechat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.UnicastProcessor;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Created by johan on 31/5/17.
 */
public class EchoWebSocketHandler implements WebSocketHandler {

    private UnicastProcessor<String> messagePublisher;
    private Flux<String> messages;
    private ObjectMapper mapper;
    private AtomicInteger idGenerator;

    public EchoWebSocketHandler() {
        messagePublisher = UnicastProcessor.create();
        idGenerator = new AtomicInteger(1);
        mapper = new ObjectMapper();
        messages = messagePublisher
                .map(this::JSONStringToMap)
                .map(json -> {
                    json.put("id", idGenerator.addAndGet(1));
                    json.put("timestamp", System.currentTimeMillis());
                    return json;
                })
                .map(this::mapToJSONString)
                .replay(1)
                .autoConnect();
    }

    @Override
    public Mono<Void> handle(WebSocketSession session) {
        session.receive().map(WebSocketMessage::getPayloadAsText).subscribe(messagePublisher::onNext);
        return session.send(messages.map(session::textMessage));
    }

    private Map<String, Object> JSONStringToMap(String json){
        try {
            return mapper.readValue(json, new TypeReference<Map<String, Object>>(){});
        } catch (IOException e) {
            throw new RuntimeException("Invalid JSON:"+json, e);
        }
    }

    private String mapToJSONString(Map<String, Object> value){
        try {
            return mapper.writeValueAsString(value);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
    
}
