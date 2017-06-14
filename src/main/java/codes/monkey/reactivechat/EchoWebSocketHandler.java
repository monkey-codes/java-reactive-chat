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
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * Created by johan on 31/5/17.
 */
public class EchoWebSocketHandler implements WebSocketHandler {

    private UnicastProcessor<Event> eventPublisher;
    private Flux<String> outputEvents;
    private ObjectMapper mapper;

    public EchoWebSocketHandler(UnicastProcessor<Event> eventPublisher, Flux<Event> events) {
        this.eventPublisher = eventPublisher;
        mapper = new ObjectMapper();
        this.outputEvents = Flux.from(events).map(this::toJSON);
    }

    @Override
    public Mono<Void> handle(WebSocketSession session) {
        WebSocketMessageSubscriber subscriber = new WebSocketMessageSubscriber(eventPublisher);
        Flux<Event> map = session.receive()
                .map(WebSocketMessage::getPayloadAsText)
                .map(this::toEvent);
//        map.subscribe(eventPublisher::onNext);
        map.subscribe(subscriber::onNext, subscriber::onError, subscriber::onComplete);
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

    private static class WebSocketMessageSubscriber {
        private UnicastProcessor<Event> eventPublisher;
        private Optional<Event> lastReceivedEvent = Optional.empty();

        public WebSocketMessageSubscriber(UnicastProcessor<Event> eventPublisher) {
            this.eventPublisher = eventPublisher;
        }

        public void onNext(Event event){
            lastReceivedEvent = Optional.of(event);
            eventPublisher.onNext(event);
        }

        public void onError(Throwable error){
            //TODO log error
        }

        public void onComplete(){

//            lastReceivedEvent.ifPresent(eventPublisher.onNext(new Event(Event.Type.USER_LEFT, new HashMap<>())));
            lastReceivedEvent.ifPresent(event -> {
                Map<String, Object>  payload = new HashMap<>();
                payload.put("user", event.getPayload().get("user"));
                System.out.println(payload);
                eventPublisher.onNext(new Event(Event.Type.USER_LEFT, payload));
            });
        }

    }
}
