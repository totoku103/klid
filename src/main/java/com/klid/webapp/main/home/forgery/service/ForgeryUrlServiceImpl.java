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
package com.klid.webapp.main.home.forgery.service;

import java.util.HashMap;
import java.util.Map;

import jakarta.annotation.Resource;

import org.springframework.stereotype.Service;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.MsgService;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.home.forgery.persistence.ForgeryUrlMapper;

@Service("forgeryUrlService")
public class ForgeryUrlServiceImpl extends MsgService implements ForgeryUrlService {

	@Resource(name = "forgeryUrlMapper")
	private ForgeryUrlMapper mapper;

	@Override
	public ReturnData getForgeryUrl(Criterion criterion){
		return new ReturnData(mapper.selectForgeryUrl(criterion.getCondition()));
	}

	@Override
	public ReturnData getForgeryUrlHist(Criterion criterion){
		return new ReturnData(mapper.selectForgeryUrlHist(criterion.getCondition()));
	}

	//메인화면 홈페이지 모니터링
	@Override
	public ReturnData getMainForgeryHm(Criterion criterion) {
		return new ReturnData(mapper.selectMainForgeryHm(criterion.getCondition()));
	}

	@Override
	public ReturnData getMainForgeryCnt(Criterion criterion) {
		Map<String, Object> returnList = new HashMap<String, Object>();
		returnList.put("contents", mapper.selectMainForgeryCnt(criterion.getCondition()));
		return new ReturnData(returnList);
	}

	@Override
	public ReturnData getByInstNm(Criterion criterion){
		return new ReturnData(mapper.getByInstNm(criterion.getCondition()));
	}

}
