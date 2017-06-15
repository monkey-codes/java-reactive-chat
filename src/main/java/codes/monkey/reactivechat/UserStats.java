package codes.monkey.reactivechat;

import codes.monkey.reactivechat.Event.Type;
import reactor.core.publisher.Flux;
import reactor.core.publisher.UnicastProcessor;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Predicate;

import static codes.monkey.reactivechat.Event.Type.*;
import static java.util.Arrays.asList;

/**
 * Created by johan on 13/6/17.
 */
public class UserStats {


    UnicastProcessor eventPublisher;
    Map<String, Stats> userStatsMap = new ConcurrentHashMap();

    public UserStats(Flux<Event> events, UnicastProcessor eventPublisher) {
        this.eventPublisher = eventPublisher;
        events
                .filter(type(CHAT_MESSAGE, USER_JOINED))
                .subscribe(this::onChatMessage);
        events
                .filter(type(USER_LEFT))
                .map(this::userAlias)
                .subscribe(userStatsMap::remove);

        events
                .filter(type(USER_JOINED))
                .subscribe(event -> eventPublisher.onNext(new Event(USER_STATS, new HashMap(userStatsMap))));
    }

    private static Predicate<Event> type(Type... types){
        return event ->  asList(types).contains(event.getType());
    }

    private void onChatMessage(Event event) {
        String alias = userAlias(event);
        Stats stats = userStatsMap.computeIfAbsent(alias, s -> new Stats(getUser(event)));
        stats.onChatMessage(event);
    }

    private Map<String, Object> getUser(Event event) {
        return (Map<String, Object>) event.getPayload().get("user");
    }

    private String userAlias(Event event) {
        return (String) (getUser(event)).get("alias");
    }

    private static class Stats {
        private Map<String, Object> user;
        private long lastMessage;
        private AtomicInteger messageCount = new AtomicInteger();

        public Stats(Map<String, Object> user) {
            this.user = user;
        }

        public void onChatMessage(Event event) {
            lastMessage = event.getTimestamp();
            if(CHAT_MESSAGE == event.getType()) messageCount.incrementAndGet();
        }

        public Map<String, Object> getUser() {
            return user;
        }

        public long getLastMessage() {
            return lastMessage;
        }

        public int getMessageCount() {
            return messageCount.get();
        }
    }
}
