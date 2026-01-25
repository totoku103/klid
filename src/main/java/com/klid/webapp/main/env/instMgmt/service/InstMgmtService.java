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
package com.klid.webapp.main.env.instMgmt.service;

import jakarta.servlet.http.HttpServletResponse;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;

public interface InstMgmtService {

	/** 기관관리 리스트 조회 */
	public ReturnData getInstMgmtList(Criterion criterion);
	
	/** 기관관리 조회 */
	public ReturnData getInstMgmtInfo(Criterion criterion) ;

	/** 기관관리 코드 중복 조회 */
	public ReturnData getInstCdChk(Criterion criterion) ;
	
	/** 기관 추가 */
	public ReturnData addInstMgmt(Criterion criterion) ;
	
	/** 기관 수정 */
	public ReturnData saveInstMgmt(Criterion criterion) ;
	
	/** 기관 삭제 */
	public ReturnData delInstMgmt(Criterion criterion) ;
	
	/** 엑셀 출력 */
	public ReturnData export(HttpServletResponse response, Criterion criterion);
}
