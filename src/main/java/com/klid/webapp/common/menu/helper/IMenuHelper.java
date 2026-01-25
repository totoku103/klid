/**
 * Program Name	: IMenuHelper.java
 *
 * Version		:  3.0
 *
 * Creation Date	: 2016. 1. 10.
 * 
 * Programmer Name 	: Bae Jung Yeo
 *
 * Copyright 2015 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.common.menu.helper;

import java.util.HashMap;
import java.util.Map;

/**
 * @author jjung
 *
 */
public abstract class IMenuHelper {

	final Map<String, MenuVO> menuList = new HashMap<>();

	public abstract String getUrlByGuid(String guid);

	public Map<String, MenuVO> getMenuList() {
		return menuList;
	}
	
}
