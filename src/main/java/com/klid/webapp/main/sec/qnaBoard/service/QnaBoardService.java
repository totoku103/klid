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
package com.klid.webapp.main.sec.qnaBoard.service;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;

/**
 * @author dong ju
 *
 */
public interface QnaBoardService {

	ReturnData getPostBoardList(Criterion criterion) ;

	ReturnData getBoardList(Criterion criterion);

	ReturnData getBoardContents(Criterion criterion);

	ReturnData addBoard(Criterion criterion) ;

	ReturnData addComment(Criterion criterion);

	ReturnData editBoard(Criterion criterion);

	ReturnData delBoard(Criterion criterion) ;

	ReturnData getMainQnaList(Criterion criterion) ;

	ReturnData checkAuth(Criterion criterion) ;
}
