package com.klid.exception;

public class NotFoundUserException extends PrefixMessageRuntimeException {

    public NotFoundUserException() {
        super(null);
    }

    public NotFoundUserException(final String prefixMessage) {
        super(prefixMessage);
    }
}
