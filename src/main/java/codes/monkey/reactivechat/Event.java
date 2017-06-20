package codes.monkey.reactivechat;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.concurrent.atomic.AtomicInteger;

public class Event {
    public enum Type {
        CHAT_MESSAGE, USER_JOINED, USER_STATS, USER_LEFT;
    }


    private static AtomicInteger ID_GENERATOR = new AtomicInteger(0);


    private Type type;

    private final int id;

    private Payload payload;

    private final long timestamp;



    @JsonCreator
    public Event(@JsonProperty("type") Type type,
                 @JsonProperty("payload") Payload payload) {
        this.type = type;
        this.payload = payload;
        this.id = ID_GENERATOR.addAndGet(1);
        this.timestamp = System.currentTimeMillis();
    }


    public Type getType() {
        return type;
    }

    public Payload getPayload() {
        return payload;
    }

    @JsonIgnore
    public User getUser(){
        return getPayload().getUser();
    }

    public int getId() {
        return id;
    }


    public long getTimestamp() {
        return timestamp;
    }

    public static EventBuilder type(Type type) {
        return new EventBuilder().type(type);
    }
}
