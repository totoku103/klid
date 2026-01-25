/**
 * Program Name	: TakeOverBoardService.java
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
package com.klid.webapp.main.sec.takeOverBoard.service;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;

/**
 * @author dong ju
 *
 */
public interface TakeOverBoardService {
	// 인수인계
	ReturnData getBoardList(Criterion criterion) ;

	ReturnData getBoardInfo(Criterion criterion);

	ReturnData addBoard(Criterion criterion) ;

	ReturnData editBoard(Criterion criterion) ;

	ReturnData addBoardConfirm(Criterion criterion);

	ReturnData editBoard_finish(Criterion criterion);
	
	// 인수인계별 답글
	ReturnData getAnsBoardList(Criterion criterion) ;

	ReturnData addAnsBoard(Criterion criterion) ;

}
