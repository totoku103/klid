/**
 * Program Name	: WebDashMoisService.java
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
package com.klid.webapp.webdash.mois.service;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;

public interface WebDashMoisService {

	ReturnData getThreatNow(Criterion criterion);

	ReturnData getHmHcUrlCenter(Criterion criterion);

	ReturnData getHmHcUrlRegion(Criterion criterion);

	ReturnData getForgeryRegion(Criterion criterion) ;

    ReturnData getRegionStatus(Criterion criterion) ;

    ReturnData getRegionStatusAuto(Criterion criterion);

    ReturnData getRegionStatusManual(Criterion criterion) ;

	ReturnData getDashConfigList(Criterion criterion) ;

	ReturnData getDashChartSum(Criterion criterion);
}
