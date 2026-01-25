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
package com.klid.webapp.main.rpt.reportInciDetail.service;

import com.klid.common.AppGlobal;
import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.MsgService;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.rpt.reportInciDetail.persistence.ReportInciDetailMapper;
import org.springframework.stereotype.Service;

import jakarta.annotation.Resource;

@Service("reportInciDetailService")
public class ReportInciDetailServiceImpl extends MsgService implements ReportInciDetailService {

	@Resource(name = "reportInciDetailMapper")
	private ReportInciDetailMapper mapper;

	/** 상세조회 */
	@Override
	public ReturnData getDetailList(Criterion criterion) {
		return new ReturnData(mapper.selectInciDetail(criterion.getCondition()));
	}

}
