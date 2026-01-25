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
package com.klid.webapp.main.env.nationIPMgmt.service;

import jakarta.servlet.http.HttpServletResponse;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;

public interface NationIPMgmtService {

	/** 국가 리스트 조회 */
	public ReturnData getNationMgmtList(Criterion criterion);
	
	/** 국가정보 조회 */
	public ReturnData getNationMgmtInfo(Criterion criterion);

	/** 국가 도메인 리스트 조회  */
	public ReturnData getNationList_domain(Criterion criterion);

	/** IP대역에 해당하는 국가코드 조회  */
	public ReturnData getNationIP_nationCd(Criterion criterion);
	
	/** 국가별 IP대역 리스트 조회  */
	public ReturnData getNationIPList(Criterion criterion) ;
	
	/** 국가IP 추가 */
	public ReturnData addNationIPMgmt(Criterion criterion);
	
	/** 국가IP 삭제 */
	public ReturnData delNationIPMgmt(Criterion criterion);
	
	/** 엑셀 출력 */
	public ReturnData export(HttpServletResponse response, Criterion criterion);
	
	/** 엑셀 출력 */
	public ReturnData export_ip(HttpServletResponse response, Criterion criterion);

	/** 국가정보조회 */
	public ReturnData getNationDetail(Criterion criterion);

	/** 국가정보수정 */
	public ReturnData editNation(Criterion criterion);
}
