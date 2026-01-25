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
package com.klid.webapp.main.rpt.reportInciPrty.persistence;



import com.klid.webapp.main.rpt.reportInciPrty.dto.ReportInciPrtyDto;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("reportInciPrtyMapper")
public interface ReportInciPrtyMapper {

	/** 사고유형 그리드 조회*/
	List<ReportInciPrtyDto> selectInciPrtyList(Map<String, Object> paramMap);

}
