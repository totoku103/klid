/**
 * Program Name	: WebDashSidoMapper.java
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
package com.klid.webapp.webdash.sido.persistence;

import com.klid.webapp.webdash.sido.dto.WebDashSidoDto;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("webDashSidoMapper")
public interface WebDashSidoMapper {

    /** 공지사항리스트 */
    List<WebDashSidoDto> getNoticeList(Map<String, Object> paramMap);

    /** 보안리스트 */
    List<WebDashSidoDto> getSecuList(Map<String, Object> paramMap);

    /** 수동차단 */
    List<WebDashSidoDto> getRegionStatusManual(Map<String, Object> paramMap);

    /** 위변조 */
    List<WebDashSidoDto> getForgeryCheck(Map<String, Object> paramMap);

    /** 헬스체크 */
    List<WebDashSidoDto> getHcCheck(Map<String, Object> paramMap);

    /** 처리현황 */
    List<WebDashSidoDto> getProcess(Map<String, Object> paramMap);

    /** 시도리스트 */
    List<WebDashSidoDto> getSidoList(Map<String, Object> paramMap);
}
