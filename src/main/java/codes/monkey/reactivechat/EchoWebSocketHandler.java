package codes.monkey.reactivechat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.UnicastProcessor;

import java.io.IOException;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Created by johan on 31/5/17.
 */
public class EchoWebSocketHandler implements WebSocketHandler {

    private UnicastProcessor<Event> messagePublisher;
    private Flux<Event> events;
    private Flux<String> outputEvents;
    private ObjectMapper mapper;
    private AtomicInteger idGenerator;

    public EchoWebSocketHandler() {
        messagePublisher = UnicastProcessor.create();
        idGenerator = new AtomicInteger(1);
        mapper = new ObjectMapper();
        events = messagePublisher
                .replay(1)
                .autoConnect();
        this.outputEvents = Flux.from(events).map(this::toJSON);
    }

    @Override
    public Mono<Void> handle(WebSocketSession session) {
        session.receive()
                .map(WebSocketMessage::getPayloadAsText)
                .map(this::toEvent)
                .subscribe(messagePublisher::onNext);
        return session.send(outputEvents.map(session::textMessage));
    }


    private Event toEvent(String json){
        try {
            return mapper.readValue(json, Event.class);
        } catch (IOException e) {
            throw new RuntimeException("Invalid JSON:"+json, e);
        }
    }

    private String toJSON(Event event){
        try {
            return mapper.writeValueAsString(event);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

}
