/**
 * Program Name	: WebDashCenterMapper.java
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
package com.klid.webapp.webdash.center.persistence;

import com.klid.webapp.webdash.center.dto.WebDashCenterDto;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("webDashCenterMapper")
public interface WebDashCenterMapper {

     List<WebDashCenterDto> selectAttNationTop5(Map<String, Object> paramMap);
     List<WebDashCenterDto> selectTypeChart(Map<String, Object> paramMap);
     List<WebDashCenterDto> selectEvtChart(Map<String, Object> paramMap);
     List<WebDashCenterDto> selectEvtAllChart(Map<String, Object> paramMap);
}
