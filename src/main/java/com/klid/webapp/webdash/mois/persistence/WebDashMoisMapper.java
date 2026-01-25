/**
 * Program Name	: WebDashMoisMapper.java
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
package com.klid.webapp.webdash.mois.persistence;

import com.klid.webapp.webdash.mois.dto.WebDashMoisDto;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("webDashMoisMapper")
public interface WebDashMoisMapper {
    /** 사이버 위기경보 */
    List<WebDashMoisDto> getThreatNow(Map<String, Object> paramMap);

    /** 홈페이지 모니터링 (중앙행정기관) */
    List<WebDashMoisDto> getHmHcUrlCenter(Map<String, Object> paramMap);

    /** 홈페이지 모니터링 (지방자치단체) */
    List<WebDashMoisDto> getHmHcUrlRegion(Map<String, Object> paramMap);

    /** 홈페이지 위변조 (지방자치단체) */
    List<WebDashMoisDto> getForgeryRegion(Map<String, Object> paramMap);

    /** 지방자치단체 사이버위협 대응현황 (지도표시) */
    List<WebDashMoisDto> getRegionStatus(Map<String, Object> paramMap);

    /** 지방자치단체 사이버위협 대응현황 (자동차단) */
    public List<String> getRegionStatusAuto(Map<String, Object> paramMap);

    /** 지방자치단체 사이버위협 대응현황 (수동차단) */
    List<WebDashMoisDto> getRegionStatusManual(Map<String, Object> paramMap);

    /** 행안부 리스트 받아오기 */
    WebDashMoisDto getDashConfigList(Map<String, Object> paramMap);

    /**행안부 중앙,지방 차트 합계 */
    List<WebDashMoisDto> getDashChartSum(Map<String, Object> paramMap);
}
