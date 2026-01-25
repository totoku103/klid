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
package com.klid.webapp.main.sys.riskMgmt.service;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;
import jakarta.servlet.http.HttpServletRequest;
/**
 * @author imhojong
 *
 */
public interface RiskMgmtService {

	ReturnData getRiskMgmt(Criterion criterion);

	ReturnData editRiskMgmt(Criterion criterion);

	ReturnData getRiskHistory(Criterion criterion);

	ReturnData addRiskHistory(Criterion criterion, HttpServletRequest request);

	ReturnData delRiskHistory(Criterion criterion) ;

	ReturnData getThreatLevel(Criterion criterion);

	ReturnData getThreatNow(Criterion criterion);

	ReturnData getThreatHist(Criterion criterion);

	ReturnData editThreat(Criterion criterion) ;

	ReturnData getPeriodNow(Criterion criterion);

	ReturnData editPeriod(Criterion criterion) ;
}
