package com.project.backend.dtos;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Resp<T> {

    public static enum Status {
        success, error
    }
    private T data;
    private Status status;
    private String message;

    public static <T> Resp<T> success(T data, String message) {
        return new Resp<T>(data, Status.success, message);
    }
    public static <T> Resp<T> success(T data) {
        return new Resp<T>(data, Status.success, null);
    }
    public static <T> Resp<T> error(T data, String message) {
        return new Resp<T>(data, Status.error, message);
    }
    public static <T> Resp<T> error(String message) {
        return new Resp<T>(null, Status.error, message);
    }

}
