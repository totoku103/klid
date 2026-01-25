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
package com.klid.webapp.main.rpt.reportWeeklyState.service;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;

public interface ReportWeeklyStateService {

	ReturnData getRotationList(Criterion criterion);

	ReturnData getWeeklyTotList(Criterion criterion);

	ReturnData getWeeklyList(Criterion criterion);

	ReturnData getTypeAccidentList(Criterion criterion);
	ReturnData getTypeAccidentList_before(Criterion criterion);

	ReturnData getDetectionList(Criterion criterion);

	ReturnData makeReportWeeklyDownload(Criterion criterion);


}
