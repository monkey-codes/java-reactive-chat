package codes.monkey.reactivechat;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class User {

    private String alias;
    private String avatar;

    public static User systemUser(){
        return new User("System", "https://robohash.org/system.png");
    }

    @JsonCreator
    public User(@JsonProperty("alias") String alias, @JsonProperty("avatar") String avatar) {
        this.alias = alias;
        this.avatar = avatar;
    }

    public String getAlias() {
        return alias;
    }

    public String getAvatar() {
        return avatar;
    }

}
