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
package com.klid.webapp.main.rpt.reportSecurityResult.persistence;



import com.klid.webapp.main.rpt.reportSecurityResult.dto.ReportResultListDto;
import com.klid.webapp.main.rpt.reportSecurityResult.dto.ReportResultTotalDto;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("reportSecurityResultMapper")
public interface ReportSecurityResultMapper {

	List<ReportResultTotalDto> selectResultTotal(Map<String, Object> paramMap);

	List<ReportResultTotalDto> selectResultList(Map<String, Object> paramMap);

	List<ReportResultTotalDto> selectResultExceptlist(Map<String, Object> paramMap);

	List<ReportResultListDto> selectSecurityTitle(Map<String, Object> paramMap);

}
