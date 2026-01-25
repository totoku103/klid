/**
 * Program Name	: PopupService.java
 *
 * Version		:  1.0
 *
 * Creation Date	: 2016. 2. 23.
 * 
 * Programmer Name 	: Song Young Wook
 *
 * Copyright 2015 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.engineer.popup.service;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;

/**
 * @author ywsong
 *
 */
public interface PopupService {

	ReturnData addPage(Criterion criterion);

	ReturnData savePage(Criterion criterion);

	ReturnData delPage(Criterion criterion);

	ReturnData addPageGroup(Criterion criterion) throws Exception;
	
	ReturnData savePageGroup(Criterion criterion);
	
	ReturnData delPageGroup(Criterion criterion);
	
	ReturnData addMenu(Criterion criterion);
	
	ReturnData saveMenu(Criterion criterion);
	
	ReturnData delMenu(Criterion criterion);
	
}
