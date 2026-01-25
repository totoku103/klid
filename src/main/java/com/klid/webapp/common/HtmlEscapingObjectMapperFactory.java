/**
 * Program Name	: HtmlEscapingObjectMapperFactory.java
 *
 * Version		:  1.0
 *
 * Creation Date	: 2016. 11. 23.
 * 
 * Programmer Name 	: jjung
 *
 * Copyright 2016 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.common;

import com.fasterxml.jackson.core.SerializableString;
import com.fasterxml.jackson.core.io.CharacterEscapes;
import com.fasterxml.jackson.core.io.SerializedString;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang3.StringEscapeUtils;
import org.springframework.beans.factory.FactoryBean;

/**
 * @author jjung
 *
 */
public class HtmlEscapingObjectMapperFactory implements FactoryBean<ObjectMapper> {

	private final ObjectMapper objectMapper;
	
	public HtmlEscapingObjectMapperFactory() {
		objectMapper = new ObjectMapper();
		objectMapper.getFactory().setCharacterEscapes(new HTMLCharacterEscapes());
		objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
	}
	
	@Override
	public ObjectMapper getObject() {
		return objectMapper;
	}

	@Override
	public Class<?> getObjectType() {
		return ObjectMapper.class;
	}
	
	
	public static class HTMLCharacterEscapes extends CharacterEscapes {

        private final int[] asciiEscapes;

        public HTMLCharacterEscapes() {
				// start with set of characters known to require escaping (double-quote, backslash etc)
				asciiEscapes = CharacterEscapes.standardAsciiEscapesForJSON();
				// and force escaping of a few others:
				// XSS 방지 처리할 특수 문자 지정
				asciiEscapes['<'] = CharacterEscapes.ESCAPE_CUSTOM;
            asciiEscapes['>'] = CharacterEscapes.ESCAPE_CUSTOM;
//            asciiEscapes['&'] = CharacterEscapes.ESCAPE_CUSTOM;
            asciiEscapes['"'] = CharacterEscapes.ESCAPE_CUSTOM;
            asciiEscapes['\''] = CharacterEscapes.ESCAPE_CUSTOM;
        }


        @Override
        public int[] getEscapeCodesForAscii() {
            return asciiEscapes;
        }

        // and this for others; we don't need anything special here
        @Override
        public SerializableString getEscapeSequence(int ch) {
            return new SerializedString(StringEscapeUtils.escapeHtml4(Character.toString((char) ch)));
        }
    }

}
