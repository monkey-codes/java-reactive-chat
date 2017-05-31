package codes.monkey.reactivechat;

import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Mono;

import java.time.Duration;

/**
 * Created by johan on 31/5/17.
 */
public class EchoWebSocketHandler implements WebSocketHandler {

    @Override
    public Mono<Void> handle(WebSocketSession session) {
        return session.send(session.receive().doOnNext(WebSocketMessage::retain).delayElements(Duration.ofSeconds(2)));
    }
}
