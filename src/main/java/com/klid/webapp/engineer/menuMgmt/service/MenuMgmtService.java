/**
 * Program Name : MenuMgmtService.java
 *
 * Version  :  1.0
 *
 * Creation Date : 2016. 2. 22.
 * 
 * Programmer Name  : Song Young Wook
 *
 * Copyright 2016 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE   : PROGRAMMER : REASON
 */

package com.klid.webapp.engineer.menuMgmt.service;
import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;

public interface MenuMgmtService {
	
	public ReturnData getPageList(Criterion criterion);
	public ReturnData getPageGroupList(Criterion criterion);
	public ReturnData getMenuList(Criterion criterion);
}
