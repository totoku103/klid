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
package com.klid.webapp.main.rpt.reportInciAttNatn.persistence;



import com.klid.webapp.main.rpt.reportInciAttNatn.dto.ReportInciAttNatnDto;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("reportInciAttNatnMapper")
public interface ReportInciAttNatnMapper {

	/** 시도 그리드 조회*/
	List<ReportInciAttNatnDto> selectAttNatnList(Map<String, Object> paramMap);

}
