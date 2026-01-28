package com.klid.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class PrefixMessageRuntimeException extends RuntimeException {
    private final String prefixMessage;
}
