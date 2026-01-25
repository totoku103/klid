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
package com.klid.webapp.main.rpt.reportCollection.service;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;

import jakarta.servlet.http.HttpServletResponse;

public interface ReportCollectionService {

	ReturnData getRetrieveSecurityHackingDetail(Criterion criterion);

	ReturnData getSecuListDetail(Criterion criterion) ;

	ReturnData getNoticeListDetail(Criterion criterion);

	ReturnData getRetrieveSecurityVulnerabilityDetail(Criterion criterion);

	ReturnData getRetrieveIncidentDetail(Criterion criterion) ;

	ReturnData exportNoticeList(HttpServletResponse response, Criterion criterion);

	ReturnData exportSecuList(HttpServletResponse response, Criterion criterion) ;

	ReturnData exportRetrieveSecurityHacking(HttpServletResponse response, Criterion criterion) ;

	ReturnData exportRetrieveSecurityVulnerability(HttpServletResponse response, Criterion criterion) ;

	ReturnData exportRetrieveIncidentDetail(HttpServletResponse response, Criterion criterion);

	ReturnData exportReportCtrsDaily(HttpServletResponse response, Criterion criterion) ;

}
