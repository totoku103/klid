/**
 * Program Name	: NoticeBoardMapper.java
 *
 * Version		:  1.0
 *
 * Creation Date	: 2015. 12. 14.
 * 
 * Programmer Name 	: kim dong ju
 *
 * Copyright 2015 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.main.sys.riskMgmt.persistence;

import java.util.Map;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.klid.webapp.main.sys.riskMgmt.dto.RiskMgmtDto;

/**
 * @author imhojong
 *
 */
@Repository("riskMgmtMapper")
public interface RiskMgmtMapper {
	RiskMgmtDto selectRiskMgmt(Map<String, Object> paramMap);

	void updateRiskMgmt(Map<String, Object> paramMap);

	List<RiskMgmtDto> selectRiskHistory(Map<String, Object> paramMap);

	int addRiskHistory(Map<String, Object> paramMap);

	void delRiskHistory(Map<String, Object> paramMap);

	List<RiskMgmtDto> selectThreatLevel(Map<String, Object> paramMap);

	List<RiskMgmtDto> selectThreatNow(Map<String, Object> paramMap);

	List<RiskMgmtDto> selectThreatHist(Map<String, Object> paramMap);

	int mergeThreat(Map<String, Object> paramMap);

	int addThreat(Map<String, Object> paramMap);

	List<RiskMgmtDto> selectPeriodNow(Map<String, Object> paramMap);

	int mergePeriod(Map<String, Object> paramMap);

}
