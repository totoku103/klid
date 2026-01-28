package com.klid.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class MessageRuntimeException extends RuntimeException {
    private final String prefixMessage;
}
