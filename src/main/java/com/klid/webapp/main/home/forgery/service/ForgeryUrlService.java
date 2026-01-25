/**
 * Program Name	: NoticeBoardService.java
 *
 * Version		:  1.0
 *
 * Creation Date	: 2015. 12. 14.
 * 
 * Programmer Name 	: kim dong ju
 *
 * Copyright 2014 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.main.home.forgery.service;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;

public interface ForgeryUrlService {
	public ReturnData getForgeryUrl(Criterion criterion);

	public ReturnData getForgeryUrlHist(Criterion criterion);

	public ReturnData getMainForgeryHm(Criterion criterion);
	
	public ReturnData getMainForgeryCnt(Criterion criterion) ;

	public ReturnData getByInstNm(Criterion criterion) ;
}
