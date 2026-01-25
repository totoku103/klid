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
package com.klid.webapp.main.rpt.reportInciDetail.persistence;



import com.klid.webapp.main.rpt.reportDaily.dto.ReportDailyDto;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("reportInciDetailMapper")
public interface ReportInciDetailMapper {

	/**일일 실적 사고처리 현황  누계 조회*/
	List<ReportDailyDto> selectInciDetail(Map<String, Object> paramMap);
}
