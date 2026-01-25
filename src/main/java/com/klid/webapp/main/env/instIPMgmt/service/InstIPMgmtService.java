/**
 * Program Name	: NoticeBoardService.java
 *
 * Version		:  1.0
 *
 * Creation Date	: 2015. 12. 14.
 * 
 * Programmer Name 	: kim dong ju
 *
 * Copyright 2014 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.main.env.instIPMgmt.service;

import jakarta.servlet.http.HttpServletResponse;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;

public interface InstIPMgmtService {

	/** 기관IP대역 리스트 조회 */
	public ReturnData getInstIPMgmtList(Criterion criterion);
	
	/** 기관별 IP정보 리스트 조회  */
	public ReturnData getInstIPMgmtList_instCd(Criterion criterion);

	/** 기관IP 추가 */
	public ReturnData addInstIPMgmt(Criterion criterion);
	
	/** 기관IP 수정 */
	public ReturnData saveInstIPMgmt(Criterion criterion);
	
	/** 기관IP 삭제 */
	public ReturnData delInstIPMgmt(Criterion criterion) ;
	
	/** 엑셀 출력 */
	public ReturnData export(HttpServletResponse response, Criterion criterion);
}
