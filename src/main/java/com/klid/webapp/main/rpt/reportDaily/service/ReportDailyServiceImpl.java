/**
 * Program Name	: NoticeBoardServiceImpl.java
 *
 * Version		:  1.0
 *
 * Creation Date	: 2015. 12. 22.
 * 
 * Programmer Name 	:  kim dong ju
 *
 * Copyright 2014 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.main.rpt.reportDaily.service;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.MsgService;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.rpt.reportDaily.persistence.ReportDailyMapper;
import org.springframework.stereotype.Service;

import jakarta.annotation.Resource;

@Service("reportDailyService")
public class ReportDailyServiceImpl extends MsgService implements ReportDailyService {

	@Resource(name = "reportDailyMapper")
	private ReportDailyMapper mapper;

	/** 일일 실적 사고처리 현황 조회 */
	@Override
	public ReturnData getReportDayStat(Criterion criterion) {
		return new ReturnData(mapper.getReportDayStat(criterion.getCondition()));
	}

}
