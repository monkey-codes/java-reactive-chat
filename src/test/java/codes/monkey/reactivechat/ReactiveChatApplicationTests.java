package codes.monkey.reactivechat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.reactive.socket.client.ReactorNettyWebSocketClient;
import org.springframework.web.reactive.socket.client.WebSocketClient;
import reactor.core.publisher.Mono;

import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.Duration;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ReactiveChatApplication.class)
public class ReactiveChatApplicationTests {

	@Test
	public void contextLoads() throws MalformedURLException, URISyntaxException {

	}


	public static void main(String[] args) throws URISyntaxException {
		WebSocketClient client = new ReactorNettyWebSocketClient();
		client.execute(new URI("ws://localhost:8080/blah"), session -> {
			return Mono.empty();
		}).block(Duration.ofMillis(10000));
	}
}
