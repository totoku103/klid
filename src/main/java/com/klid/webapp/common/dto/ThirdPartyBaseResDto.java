package com.klid.webapp.common.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.klid.webapp.common.enums.ThirdPartyResponseStatusCodes;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class ThirdPartyBaseResDto<T> {

    private Integer status;

//    사용자에게 노출될 메시지
    private String message;

//    시스템적 로그성 메시지
    @JsonProperty("detail_message")
    private String detailMessage;

    private final String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

    private T data;

    public ThirdPartyBaseResDto() {
    }

    public ThirdPartyBaseResDto(ThirdPartyResponseStatusCodes statusCodes) {
        this.status = statusCodes.getCode();
        this.message = statusCodes.getUserMessage();
        this.detailMessage = statusCodes.getSystemMessage();
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(final Integer status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(final String message) {
        this.message = message;
    }

    public String getDetailMessage() {
        return detailMessage;
    }

    public void setDetailMessage(final String detailMessage) {
        this.detailMessage = detailMessage;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public T getData() {
        return data;
    }

    public void setData(final T data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "ThirdPartyBaseResDto{" +
                "status='" + status + '\'' +
                ", message='" + message + '\'' +
                ", detailMessage='" + detailMessage + '\'' +
                ", timestamp='" + timestamp + '\'' +
                ", data=" + data +
                '}';
    }
}
