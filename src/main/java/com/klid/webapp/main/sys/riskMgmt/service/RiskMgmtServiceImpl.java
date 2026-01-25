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
package com.klid.webapp.main.sys.riskMgmt.service;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.MsgService;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.sys.riskMgmt.persistence.RiskMgmtMapper;

import java.util.List;
import java.util.Map;

/**
 * @author imhojong
 *
 */
@Service("riskMgmtService")
public class RiskMgmtServiceImpl extends MsgService implements RiskMgmtService {

	@Resource(name = "riskMgmtMapper")
	private RiskMgmtMapper mapper;
	
	@Override
	public ReturnData getRiskMgmt(Criterion criterion) {
		return new ReturnData(mapper.selectRiskMgmt(criterion.getCondition()));
	}

	@Override
	public ReturnData editRiskMgmt(Criterion criterion){
		List<Map<String, Object>> list = (List<Map<String, Object>>) criterion.getValue("inputValue");

		//update 로직 원본 소스 카피
		for(int i=0; i<list.size(); i++){
			criterion.addParam("levelCd", (i+1)*1 );
			criterion.addParam("basis", list.get(i));
			mapper.updateRiskMgmt(criterion.getCondition());
		}
		return new ReturnData(criterion.getCondition());
	}

	@Override
	public ReturnData getRiskHistory(Criterion criterion) {
		return new ReturnData(mapper.selectRiskHistory(criterion.getCondition()));
	}

	@Override
	public ReturnData addRiskHistory(Criterion criterion, HttpServletRequest request) {
		String usrIp = request.getRemoteAddr();

		criterion.addParam("usrIp", usrIp);

		mapper.addRiskHistory(criterion.getCondition());
		return new ReturnData(criterion.getValue("logSeq"));
	}

	@Override
	public ReturnData delRiskHistory(Criterion criterion)  {
		mapper.delRiskHistory(criterion.getCondition());
		return new ReturnData(criterion.getCondition());
	}

	@Override
	public ReturnData getThreatLevel(Criterion criterion) {
		return new ReturnData(mapper.selectThreatLevel(criterion.getCondition()));
	}

	@Override
	public ReturnData getThreatNow(Criterion criterion) {
		return new ReturnData(mapper.selectThreatNow(criterion.getCondition()));
	}

	@Override
	public ReturnData getThreatHist(Criterion criterion) {
		return new ReturnData(mapper.selectThreatHist(criterion.getCondition()));
	}

	@Override
	public ReturnData editThreat(Criterion criterion) {
//		return new ReturnData(mapper.mergeThreat(criterion.getCondition()));
		return new ReturnData(mapper.addThreat(criterion.getCondition()));
	}

	@Override
	public ReturnData getPeriodNow(Criterion criterion) {
		return new ReturnData(mapper.selectPeriodNow(criterion.getCondition()));
	}

	@Override
	public ReturnData editPeriod(Criterion criterion)  {
		return new ReturnData(mapper.mergePeriod(criterion.getCondition()));
	}
}
