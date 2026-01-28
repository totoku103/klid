/**
 * Program Name	: Criterion.java
 *
 * Version		:  1.0
 *
 * Creation Date	: 2015. 1. 28.
 * 
 * Programmer Name 	: Bae Jung Yeo
 *
 * Copyright 2014 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.common;

import lombok.extern.slf4j.Slf4j;
import com.klid.common.AppGlobal;
import com.klid.webapp.common.dto.UserDto;
import org.apache.commons.lang3.StringUtils;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * @author jung
 *
 */
@Slf4j
public class Criterion {
	
	private Map<String, Object> condition = new HashMap<String, Object>();
	
	/**
	 * Construct
	 * 사용자정보를 default로 추가
	 */
	public Criterion() {
		// 환경변수
		this.addParam("webSiteName", AppGlobal.webSiteName);

		UserDto userDto = SessionManager.getUser();
		if(userDto != null) {
			this.addParam("userId", userDto.getUserId());
		}
	}
	
	/**
	 * Construct
	 * 파라미터로 받은 reqMap을 condition에 추가
	 * @param reqMap
	 */
	public Criterion(Map<String, Object> reqMap) {
		this();
		Iterator<String> keys = reqMap.keySet().iterator();
		while(keys.hasNext()) {
			String key = keys.next();
			this.addParam(key, reqMap.get(key));
		}
	}

	public Criterion(Map<String, Object> reqMap, boolean isXSS) {
		this();
		Iterator<String> keys = reqMap.keySet().iterator();
		while(keys.hasNext()) {
			String key = keys.next();
			Object value = reqMap.get(key);
			if(isXSS) {
				if(value instanceof String) {
					String strVal = value.toString();
					if(!StringUtils.isBlank(strVal)) {
						strVal = strVal.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
						strVal = strVal.replaceAll("\\(", "&#40;").replaceAll("\\)", "&#41;");
						strVal = strVal.replaceAll("'", "&#39;");
						strVal = strVal.replaceAll("eval\\((.*)\\)", "");
						strVal = strVal.replaceAll("[\\\"\\\'][\\s]*javascript:(.*)[\\\"\\\']", "\"\"");
						this.addParam(key, strVal);
						continue;
					}
				}
			}
			this.addParam(key, reqMap.get(key));
		}
	}
	
	/** 
	 * 파라미터 추가
	 * @param key
	 * @param value
	 */
	public void addParam(String key, Object value) {
		this.condition.put(key, value);
	}

	/**
	 * key를 인자로 받아 value 리턴
	 * @param key
	 * @return
	 */
	public Object getValue(String key) {
		if(containsKey(key)) {
			return condition.get(key);
		}
		return null;
	}
	
	/**
	 * key가 존재하면 true, 그렇지 않으면 false 리턴
	 * @param key
	 * @return
	 */
	public boolean containsKey(String key) {
		return condition.containsKey(key);
	}
	
	/**
	 * @return the condition
	 */
	public Map<String, Object> getCondition() {
		return condition;
	}

	/**
	 * @param condition the condition to set
	 */
	public void setCondition(Map<String, Object> condition) {
		this.condition = condition;
	}

}
