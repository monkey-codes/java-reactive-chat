package codes.monkey.reactivechat;

import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.UnicastProcessor;

/**
 * Created by johan on 31/5/17.
 */
public class EchoWebSocketHandler implements WebSocketHandler {

    private UnicastProcessor<String> messagePublisher;
    private Flux<String> messages;

    public EchoWebSocketHandler() {
        messagePublisher = UnicastProcessor.create();
        messages = messagePublisher.replay(1).autoConnect();
    }

    @Override
    public Mono<Void> handle(WebSocketSession session) {
        session.receive().map(WebSocketMessage::getPayloadAsText).subscribe(messagePublisher::onNext);
        return session.send(messages.map(session::textMessage));
    }

}
