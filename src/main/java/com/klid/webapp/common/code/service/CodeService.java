/**
 * Program Name	: LoginService.java
 *
 * Version		:  1.0
 *
 * Creation Date	: 2015. 3. 2.
 * 
 * Programmer Name 	: Bae Jung Yeo
 *
 * Copyright 2014 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.common.code.service;


import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;

public interface CodeService {

	public ReturnData getCommonCode(Criterion criterion) ;

	public ReturnData getLocalCode(Criterion criterion);

	public ReturnData getNationCode(Criterion criterion) ;

	public ReturnData getInstCode(Criterion criterion) ;

	public ReturnData getCodeList(Criterion criterion);

	ReturnData addCode(Criterion criterion);

	ReturnData editCode(Criterion criterion);

	ReturnData getCodeDuplCnt(Criterion criterion);

	ReturnData addWeekDay(Criterion criterion);

	ReturnData delWeekDay(Criterion criterion);

	ReturnData getCustUserList(Criterion criterion);

	ReturnData addCustUser(Criterion criterion);

	ReturnData editCustUser(Criterion criterion);

	ReturnData delCustUser(Criterion criterion);

    ReturnData getBoardMgmtList(Criterion criterion);

	ReturnData getBoardMgmt(Criterion criterion);

	ReturnData editBoardMgmt(Criterion criterion);

	public ReturnData getSurveyType(Criterion criterion);

	ReturnData getDetailBoardMgmtList(Criterion criterion);

	ReturnData getCodeFilePath(Criterion criterion);

	//대시보드 상단메시지
	ReturnData getDashTextCode(Criterion criterion);

	ReturnData getNoticeSrcType(Criterion criterion);


}
