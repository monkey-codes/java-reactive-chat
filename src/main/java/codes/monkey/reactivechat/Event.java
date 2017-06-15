package codes.monkey.reactivechat;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Collections;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Created by johan on 13/6/17.
 */
public class Event {

    private static AtomicInteger ID_GENERATOR = new AtomicInteger(0);

    public static enum Type {
        CHAT_MESSAGE, USER_JOINED, USER_STATS, USER_LEFT
    }

    private Type type;

    private final int id;

    private Map<String, Object> payload;

    private final long timestamp;


    @JsonCreator
    public Event(@JsonProperty("type") Type type,
                 @JsonProperty("payload") Map<String, Object> payload) {
        this.type = type;
        this.payload = Collections.unmodifiableMap(payload);
        this.id = ID_GENERATOR.addAndGet(1);
        this.timestamp = System.currentTimeMillis();
    }


    public Type getType() {
        return type;
    }

    public Map<String, Object> getPayload() {
        return payload;
    }

    public int getId() {
        return id;
    }

    public long getTimestamp() {
        return timestamp;
    }
}
