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
package com.klid.webapp.main.home.forgery.persistence;



import java.util.List;
import java.util.Map;

import com.klid.webapp.common.dto.UserDto;
import com.klid.webapp.main.home.forgery.dto.ForgeryUrlDto;
import org.springframework.stereotype.Repository;

import com.klid.webapp.main.env.instIPMgmt.dto.InstIPMgmtDto;

@Repository("forgeryUrlMapper")
public interface ForgeryUrlMapper {
	public List<InstIPMgmtDto> selectForgeryUrl(Map<String, Object> paramMap);

	public List<InstIPMgmtDto> selectForgeryUrlHist(Map<String, Object> paramMap);

	//메인화면 홈페이지 모니터링
	public List<ForgeryUrlDto> selectMainForgeryHm(Map<String, Object> paramMap);
	
	//메인화면 홈페이지 모니터링 수치 통계
	public ForgeryUrlDto selectMainForgeryCnt(Map<String, Object> paramMap);

	ForgeryUrlDto getByInstNm(Map<String, Object> paramMap);

}
