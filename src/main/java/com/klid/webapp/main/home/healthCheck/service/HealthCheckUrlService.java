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
package com.klid.webapp.main.home.healthCheck.service;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;
import java.util.Map;
import com.klid.webapp.main.home.healthCheck.dto.HealthCheckUrlDto;

import jakarta.servlet.http.HttpServletResponse;

public interface HealthCheckUrlService {
	public ReturnData getHealthCheckUrl(Criterion criterion);

	ReturnData addHealthCheckUrl(Criterion criterion) throws Exception;

	ReturnData editHealthCheckUrl(Criterion criterion);

	ReturnData editWatchOn(Criterion criterion);

	ReturnData editWatchOff(Criterion criterion);
	
	ReturnData getDetailHealthCheckUrl(Criterion criterion);

	ReturnData delHealthCheckUrl(Criterion criterion);

	public ReturnData getHealthCheckHist(Criterion criterion);

	public ReturnData getHealthCheckStat(Criterion criterion);

    ReturnData export(Criterion criterion);

    ReturnData importXls(Criterion criterion);
}
